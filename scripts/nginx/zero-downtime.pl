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


# run docker in downPort
`docker run -p $downPort:4000 --name $downPort --rm -d --pull always --env DOTENV_KEY=$ENV_DOTENV_KEY -v $ENV_DB_PATH:/prod/backend/service/db $ENV_DOCKERHUB_TAG:latest`;

# waiting server ready
sleep(5);

# check instance is running
my $curl = `curl http://localhost:$downPort`;
# if server is not running,
#   remove new instance and die
if($curl !~ /okay/ && $curl !~ /true/) {
	die "new instance is not running";
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
`docker container stop $runningPort`;
`docker images prune -a -f`;
