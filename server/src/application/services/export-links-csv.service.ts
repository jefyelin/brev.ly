import { PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";
import { type Either, left, right } from "@/core/either";
import { env } from "@/infrastructure/config/env";
import { db } from "@/infrastructure/db";
import { clientCloudflareR2 } from "@/infrastructure/storage/client";
import { Upload } from "@aws-sdk/lib-storage";
import { stringify } from "csv-stringify";
import { z } from "zod";
import { InternalServerErrorError } from "../errors/internal-server-error";

export const exportLinksCSVOutputSchema = z.object({
	fileName: z.string(),
	url: z.string().url(),
});

type ExportLinksCSVOutput = z.infer<typeof exportLinksCSVOutputSchema>;

export const exportLinksCSVService = async (): Promise<
	Either<Error, ExportLinksCSVOutput>
> => {
	try {
		const links = await db.query.links.findMany({
			columns: {
				originalUrl: true,
				shortCode: true,
				accessCount: true,
				createdAt: true,
			},
			orderBy: (fields, { desc }) => [desc(fields.createdAt)],
		});

		const fileName = `links-${crypto.randomUUID()}.csv`;

		const csvStream = stringify(links, {
			header: true,
			columns: {
				originalUrl: "Original URL",
				shortCode: "Short Code",
				accessCount: "Access Count",
				createdAt: "Created At",
			},
		});

		const streamToUpload = new PassThrough();

		const upload = new Upload({
			client: clientCloudflareR2,
			params: {
				Bucket: env.CLOUDFLARE_BUCKET_NAME,
				Key: fileName,
				Body: streamToUpload,
				ContentType: "text/csv",
			},
		});

		await Promise.all([pipeline(csvStream, streamToUpload), upload.done()]);

		const fileUrl = `${env.CLOUDFLARE_BUCKET_PUBLIC_URL}/${fileName}`;

		return right({
			fileName,
			url: fileUrl,
		});
	} catch {
		return left(new InternalServerErrorError());
	}
};
