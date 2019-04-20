import DropOrPasteImages from "slate-drop-or-paste-images";

 export const  plugins = [
  DropOrPasteImages({
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: "image",
        isVoid: true,
        data: { file }
      });
    }
  })
];