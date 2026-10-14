import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Set A Title For This Post").isLength({ min: 3 }).isString(),
  body("description", "Write A Description For This Post")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Wrong format of the tags!")
    .optional()
    .isArray()
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Tags cannot be empty.");
      }
      for (const tag of value) {
        if (
          tag.trim() === "#" ||
          tag.trim() === "##" ||
          tag.trim() === "##" ||
          tag.trim() === ""
        ) {
          throw new Error(
            "Tags cannot be empty or '#'. Just write your tags through the SPACE"
          );
        }
      }

      return true;
    }),
  body("image", "Wrong link for the image").optional().isString(),
];
