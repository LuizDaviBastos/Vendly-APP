import { marks, schema as baseSchema } from 'ngx-editor/schema';
import { Schema } from 'prosemirror-model';
import { addMentionNodes, addTagNodes } from 'prosemirror-mentions';

const schema = new Schema({
  nodes: addTagNodes(addMentionNodes(baseSchema.spec.nodes)),
  marks,
});

export default schema;
