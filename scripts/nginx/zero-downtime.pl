#! /usr/bin/perl
use strict;
use warnings;

# zero-downtime deployment with nginx & docker

# retrieve env variables
my $ENV_DOTENV_KEY = `echo \$DOTENV_KEY`;
chomp $ENV_DOTENV_KEY;
my $ENV_DB_PATH = `echo \$DB_PATH`;
chomp $ENV_DB_PATH;
my $ENV_DOCKERHUB_TAG = `echo \$DOCKERHUB_TAG`;
chomp $ENV_DOCKERHUB_TAG;


# retrieve arguments
my $nginxConfPath = shift(@ARGV);


# regex
my$ regexUsingPort = "(server [0-9.]*:)(\\d{4})([ ]*;)";
my$ regexAvailablePort = "(server [0-9.]*:)(\\d{4})([ ]*down[ ]*;)";

# get downPort and runningPort
my $nginxConf = `cat $nginxConfPath`;
$nginxConf =~ m/$regexUsingPort/;
my $runningPort = $2;
$nginxConf =~ m/$regexAvailablePort/;
my $downPort = $2;

die "error $runningPort / $downPort" if($runningPort !~ /\d{4}/ || $downPort !~ /\d{4}/);

# run docker in downPort
my $dockerRun=`docker run -p $downPort:4000 --name $downPort --rm -d --pull always --env DOTENV_KEY=$ENV_DOTENV_KEY -v $ENV_DB_PATH:/prod/backend/service/db $ENV_DOCKERHUB_TAG:latest`;

# check instance is running
sub check_new_docker_container_running() {
	my $i = 0;
	while($i < 10) {
		my $status = `docker inspect --format='{{.State.Status}}' $downPort`;
		chomp $status;
		print"status: $status\n";
		if($status =~ /running/) {
			return 1;
		}
		if($status =~ /Error/){
			return 0;
		}
		sleep(10);
		$i++;
  }
	return 0;
}
if(!check_new_docker_container_running()){
	`docker stop $downPort`;
	die "instance not running";
}

sub check_server_is_running() {
  my $i = 0;
  while($i < 10) {
    my $status = `curl -s -I http://localhost:$downPort | grep "HTTP/1.1 200 OK"`;
		chomp $status;
		print"GET /: $status\n";
		if($status =~ /HTTP\/1.1 200 OK/){
			return 1;
		}
		sleep(10);
	}
	return 0;
}
if(!check_server_is_running()){
	`docker stop $downPort`;
	die "instance not running";
}



# downPort <-> runningPort in nginxConf
my $newNginxConf = $nginxConf;
$newNginxConf =~ s/$regexAvailablePort/$1$runningPort$3/;
$newNginxConf =~ s/$regexUsingPort/$1$downPort$3/;

open (FH, '>', $nginxConfPath) or die "Cannot open $!";
print FH $newNginxConf;
close FH;

# restart nginx
`sudo systemctl restart nginx`;

# stop old container
print"stop old container running on $runningPort\n";
`docker container stop $runningPort`;
print"remove old image\n";
`docker image prune -a -f`;

