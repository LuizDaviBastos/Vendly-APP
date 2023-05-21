/**
 * See https://prosemirror.net/docs/ref/#model.NodeSpec
 */
export const mentionNode = {
  group: "inline",
  inline: true,
  atom: true,

  attrs: {
    name: "",
  },

  selectable: false,
  draggable: false,

  toDOM: node => {
    return [
      "label",
      {
        "name": `mention-${node.attrs.name}`,
        class: "prosemirror-mention-node"
      },
      "@" + node.attrs.name
    ];
  },

  parseDOM: [
    {
      // match tag with following CSS Selector
      tag: 'label[name^="mention"]',

      getAttrs: dom => {
        var name = dom.getAttribute("name");
        return {
          name: name?.replace('mention-', '')
        };
      }
    }
  ]
};

/**
 * See https://prosemirror.net/docs/ref/#model.NodeSpec
 */
export const tagNode = {
  group: "inline",
  inline: true,
  atom: true,

  attrs: {
    tag: ""
  },

  selectable: false,
  draggable: false,

  toDOM: node => {
    return [
      "span",
      {
        "data-tag": node.attrs.tag,
        class: "prosemirror-tag-node"
      },
      "#" + node.attrs.tag
    ];
  },

  parseDOM: [
    {
      // match tag with following CSS Selector
      tag: "span[data-tag]",

      getAttrs: dom => {
        var tag = dom.getAttribute("data-tag");
        return {
          tag: tag
        };
      }
    }
  ]
};
