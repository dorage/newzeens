import bcrypt from "bcrypt";

const main = async () => {
	const password = process.argv.pop();

	if (password == null) throw new Error("Password not found");

	const genHash = new Promise((resolve) => {
		const saltRounds = 10;

		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				// Store hash in your password DB.
				console.log("[password has generated] ==============================");
				console.log("HASH : ", hash);
				resolve(true);
			});
		});
	});
	await genHash;
};

main();
