ALTER TABLE `image` ADD `imgType` text;--> statement-breakpoint
ALTER TABLE `image` DROP COLUMN `thumbnailImageKey`;--> statement-breakpoint
ALTER TABLE `image` DROP COLUMN `hoverImageKey`;