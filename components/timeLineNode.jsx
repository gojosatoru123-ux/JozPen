import { Node } from '@tiptap/core';

const TimelineNode = Node.create({
  name: 'timeline',
  group: 'block',
  content: 'timelineEntry*',
  selectable: false,

  parseHTML() {
    return [{ tag: 'div[data-timeline]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-timeline': '',
        style: 'display: flex; flex-direction: column; align-items: center; width: 100%; min-width: 300px; max-width: 500px; margin: 0 auto; padding: 1rem 0; font-family: "Source Sans Pro", arial, sans-serif; font-weight: 300; color: rgb(51, 51, 51); box-sizing: border-box; position: relative;',
        ...HTMLAttributes,
      },
      0,
    ];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const dom = document.createElement('div');
      dom.setAttribute('data-timeline', '');
      dom.style.display = 'flex';
      dom.style.flexDirection = 'column';
      dom.style.alignItems = 'center';
      dom.style.width = '100%';
      dom.style.minWidth = '300px';
      dom.style.maxWidth = '500px';
      dom.style.margin = '0 auto';
      dom.style.padding = '1rem 0';
      dom.style.fontFamily = '"Source Sans Pro", arial, sans-serif';
      dom.style.fontWeight = '300';
      dom.style.color = 'rgb(51, 51, 51)';
      dom.style.boxSizing = 'border-box';
      dom.style.position = 'relative';

      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.left = '50%';
      line.style.transform = 'translateX(-50%)';
      line.style.width = '2px';
      line.style.backgroundColor = 'rgb(239, 68, 68)';
      line.style.height = '100%';
      line.style.top = '0';
      line.style.zIndex = '1';
      dom.appendChild(line);

      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 600px) {
          div[data-timeline] > div[style*="position: absolute"] {
            display: none;
          }
          div[data-timeline] {
            min-width: 100%;
            padding: 0.5rem 0;
          }
        }
      `;
      dom.appendChild(style);

      dom.addEventListener('click', (event) => {
        if (event.target === dom) {
          const pos = typeof getPos === 'function' ? getPos() : 0;
          editor.commands.setTextSelection(pos + node.nodeSize);
        }
      });

      return {
        dom,
        contentDOM: dom,
      };
    };
  },

  addCommands() {
    return {
      insertTimeline: () => ({ commands, state }) => {
        // Search the entire document for an existing timeline node
        let timelineNode = null;
        let timelinePos = null;
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'timeline') {
            timelineNode = node;
            timelinePos = pos;
            return false; // Stop traversal once found
          }
        });

        const newEntry = {
          type: 'timelineEntry',
          content: [
            {
              type: 'timelineTitle',
              content: [
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'New Entry' }] },
                { type: 'paragraph', content: [{ type: 'text', text: 'New Title, Company' }] },
              ],
            },
            {
              type: 'timelineBody',
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'New description here.' }] },
              ],
            },
          ],
        };

        if (timelineNode && timelinePos !== null) {
          // Append new entry to existing timeline
          const endPos = timelinePos + timelineNode.nodeSize - 1;
          return commands.insertContentAt(endPos, newEntry);
        } else {
          // Create new timeline with one entry
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'timelineEntry',
                content: [
                  {
                    type: 'timelineTitle',
                    content: [
                      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '2006 - 2008' }] },
                      { type: 'paragraph', content: [{ type: 'text', text: 'Title, Company' }] },
                    ],
                  },
                  {
                    type: 'timelineBody',
                    content: [
                      {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Voluptatibus veniam ea reprehenderit atque reiciendis non laborum adipisci ipsa pariatur omnis.' }],
                      },
                      {
                        type: 'bulletList',
                        content: [
                          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Rerum sit libero possimus amet excepturi' }] }] },
                          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Exercitationem enim dolores sunt praesentium dolorum praesentium' }] }] },
                          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Modi aut dolores dignissimos sequi sit ut aliquid molestias deserunt illo' }] }] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          });
        }
      },
    };
  },
});

const TimelineEntryNode = Node.create({
  name: 'timelineEntry',
  group: 'block',
  content: 'timelineTitle timelineBody',
  selectable: false,

  parseHTML() {
    return [{ tag: 'div[class="entry"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: 'entry',
        style: 'display: flex; align-items: flex-start; width: 100%; margin-bottom: 2rem; position: relative; z-index: 2;',
        ...HTMLAttributes,
      },
      0,
    ];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const dom = document.createElement('div');
      dom.className = 'entry';
      dom.style.display = 'flex';
      dom.style.alignItems = 'flex-start';
      dom.style.width = '100%';
      dom.style.marginBottom = '2rem';
      dom.style.position = 'relative';
      dom.style.zIndex = '2';

      dom.addEventListener('mouseenter', () => {
        dom.style.transform = 'scale(1.02)';
        dom.style.transition = 'transform 0.3s ease';
      });
      dom.addEventListener('mouseleave', () => {
        dom.style.transform = 'scale(1)';
      });

      dom.addEventListener('click', (event) => {
        if (event.target === dom) {
          const pos = typeof getPos === 'function' ? getPos() : 0;
          editor.commands.setTextSelection(pos + node.nodeSize);
        }
      });

      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 600px) {
          .entry {
            flex-direction: column;
            align-items: center;
            margin-bottom: 1.5rem;
          }
        }
      `;
      dom.appendChild(style);

      return { dom, contentDOM: dom };
    };
  },
});

const TimelineTitleNode = Node.create({
  name: 'timelineTitle',
  group: 'block',
  content: 'heading paragraph',
  selectable: false,

  parseHTML() {
    return [
      {
        tag: 'div[class="title"]',
        getAttrs: (element) => ({
          level: element.querySelector('h3') ? 3 : null,
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: 'title',
        style: 'width: 45%; padding-right: 1rem; text-align: right; position: relative; font-size: 0.9rem; margin-right: 0;',
        ...HTMLAttributes,
      },
      0,
    ];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const dom = document.createElement('div');
      dom.className = 'title';
      dom.style.width = '45%';
      dom.style.paddingRight = '1rem';
      dom.style.textAlign = 'right';
      dom.style.position = 'relative';
      dom.style.fontSize = '0.9rem';
      dom.style.marginRight = '0';

      dom.addEventListener('click', (event) => {
        if (event.target === dom) {
          const pos = typeof getPos === 'function' ? getPos() : 0;
          editor.commands.setTextSelection(pos + node.nodeSize);
        }
      });

      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 600px) {
          .title {
            width: 100%;
            text-align: center;
            padding-right: 0;
            margin-bottom: 0.5rem;
          }
        }
      `;
      dom.appendChild(style);

      return { dom, contentDOM: dom };
    };
  },
});

const TimelineBodyNode = Node.create({
  name: 'timelineBody',
  group: 'block',
  content: 'paragraph bulletList?',
  selectable: false,

  parseHTML() {
    return [{ tag: 'div[class="body"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: 'body',
        style: 'width: 55%; padding-left: 1rem; position: relative; border-left: 2px solid rgb(239, 68, 68); font-size: 0.9rem;',
        ...HTMLAttributes,
      },
      0,
    ];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const dom = document.createElement('div');
      dom.className = 'body';
      dom.style.width = '55%';
      dom.style.paddingLeft = '1rem';
      dom.style.position = 'relative';
      dom.style.borderLeft = '2px solid rgb(239, 68, 68)';
      dom.style.fontSize = '0.9rem';

      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.left = '-1.1rem';
      dot.style.top = '0.5rem';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.background = 'rgb(239, 68, 68)';
      dot.style.borderRadius = '50%';
      dom.appendChild(dot);

      dom.addEventListener('click', (event) => {
        if (event.target === dom) {
          const pos = typeof getPos === 'function' ? getPos() : 0;
          editor.commands.setTextSelection(pos + node.nodeSize);
        }
      });

      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 600px) {
          .body {
            width: 100%;
            padding-left: 0;
            border-left: none;
            margin-top: 0.5rem;
          }
          .body div[style*="position: absolute"] {
            left: 0;
            top: -0.5rem;
          }
        }
      `;
      dom.appendChild(style);

      return { dom, contentDOM: dom };
    };
  },
});

export { TimelineNode, TimelineEntryNode, TimelineTitleNode, TimelineBodyNode };