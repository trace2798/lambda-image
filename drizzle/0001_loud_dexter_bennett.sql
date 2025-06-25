CREATE TABLE `workspace` (
	`id` text PRIMARY KEY NOT NULL,
	`publicId` text,
	`name` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `workspace_user_idx` ON `workspace` (`userId`);