CREATE TABLE `image` (
	`id` text PRIMARY KEY NOT NULL,
	`publicId` text NOT NULL,
	`originalImageKey` text,
	`thumbnailImageKey` text,
	`alt` text,
	`workspaceId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `image_publicId_unique` ON `image` (`publicId`);--> statement-breakpoint
CREATE INDEX `image_workspace_idx` ON `image` (`workspaceId`);--> statement-breakpoint
CREATE INDEX `image_publicid_idx` ON `image` (`publicId`);--> statement-breakpoint
CREATE INDEX `image_workspubid_idx` ON `image` (`workspaceId`,`publicId`);--> statement-breakpoint
CREATE TABLE `workspace` (
	`id` text PRIMARY KEY NOT NULL,
	`publicId` text NOT NULL,
	`title` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_publicId_unique` ON `workspace` (`publicId`);--> statement-breakpoint
CREATE INDEX `workspace_user_idx` ON `workspace` (`userId`);--> statement-breakpoint
CREATE INDEX `workspace_publicid_idx` ON `workspace` (`publicId`);