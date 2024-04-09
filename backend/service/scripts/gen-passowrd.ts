import bcrypt from "bcrypt";

const main = async () => {
	const password = process.argv.pop();

	if (password == null) throw new Error("Password not found");

	const genHash = new Promise((resolve) => {
		const saltRounds = 10;

		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				bcrypt.compare(password, hash, function(err, compare) {
					if (!compare) throw new Error("Compare failed");
					console.log("[password hash has been generated] ==============================");
					console.log("PASSWORD : ", password);
					console.log("HASH : ", hash);
					resolve(true);
				});
			});
		});
	});
	await genHash;
};

main();
