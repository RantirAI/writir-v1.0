import {
  AffineEditorContainer,
  EdgelessEditor,
  createEmptyDoc,
} from "@blocksuite/presets";
import { Doc, Schema } from "@blocksuite/store";
import { DocCollection } from "@blocksuite/store";
import { AffineSchemas } from "@blocksuite/blocks";
import "@blocksuite/presets/themes/affine.css";

export function initEditor(edgeLess: boolean) {
  if (edgeLess) {
    const doc = createEmptyDoc().init();
    const editor = new EdgelessEditor();
    editor.doc = doc;
    const collection = null;
    return { editor, collection };
  } else {
    const schema = new Schema().register(AffineSchemas);
    const collection = new DocCollection({ schema });
    collection.meta.initialize();

    const doc = collection.createDoc({ id: "page1" });

    doc.load(() => {
      const pageBlockId = doc.addBlock("affine:page", {});
      doc.addBlock("affine:surface", {}, pageBlockId);
      const noteId = doc.addBlock("affine:note", {}, pageBlockId);
      doc.addBlock("affine:paragraph", {}, noteId);
    });
    const editor = new AffineEditorContainer();
    editor.doc = doc;
    //@ts-ignore
    editor.slots.docLinkClicked.on(({ docId }) => {
      const target = <Doc | null>collection.getDoc(docId);
      editor.doc = target as Doc;
    });

    return { editor, collection };
  }
}

// export function initEditor() {
//   const schema = new Schema().register(AffineSchemas);
//   const collection = new DocCollection({ schema });
//   collection.meta.initialize();

//   const doc = collection.createDoc({ id: "page1" });
//   doc.load(() => {
//     const pageBlockId = doc.addBlock("affine:page", {});
//     doc.addBlock("affine:surface", {}, pageBlockId);
//     const noteId = doc.addBlock("affine:note", {}, pageBlockId);
//     doc.addBlock("affine:paragraph", {}, noteId);
//   });

//   const editor = new AffineEditorContainer();
//   editor.doc = doc;
//   editor.slots.docLinkClicked.on(({ docId }) => {
//     const target = <Doc>collection.getDoc(docId);
//     editor.doc = target;
//   });
//   return { editor, collection };
// }
