ALTER TABLE `workspace` RENAME COLUMN "name" TO "title";--> statement-breakpoint
CREATE INDEX `workspace_publicid_idx` ON `workspace` (`publicId`);