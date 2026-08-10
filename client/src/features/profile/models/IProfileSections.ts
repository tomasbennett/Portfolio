import z from "zod";


export const ProfileSections = ["replies", "posts", "comments"] as const;


export type IProfileSections = typeof ProfileSections[number];

export const ProfileSectionsSchema = z.enum(ProfileSections);

