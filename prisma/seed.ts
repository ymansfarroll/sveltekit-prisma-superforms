import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
	{
		name: 'Electronics',
		maximun: 10
	},
	{
		name: 'Furniture',
		maximun: 20
	},
	{
		name: 'Automotive',
		maximun: 100
	}
];

async function main() {
	for (const category of categories) {
		await prisma.category.create({
			data: category
		});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
