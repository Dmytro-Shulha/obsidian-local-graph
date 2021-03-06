import { FileView, ItemView, WorkspaceLeaf } from "obsidian";
import { TRIGGER_CUSTOM_LOCAL_GRAPH_OPEN, VIEW_TYPE_CUSTOM_LOCAL_GRAPH } from "../../utils/constants";

import LocalGraph from '../component/LocalGraph.svelte'

export default class LocalGraphView extends ItemView {
    private map: LocalGraph;

    constructor(leaf: WorkspaceLeaf){
        super(leaf)
    }

    getViewType(): string {
        return VIEW_TYPE_CUSTOM_LOCAL_GRAPH;
    }

    getDisplayText(): string {
        return "Custom Local Graph";
    }

    getIcon(): string {
        return "dot-network";
    }

    onClose(): Promise<void> {
        if (this.map) {
          this.map.$destroy();
        }
        return Promise.resolve();
    }

    async onOpen(): Promise<void> {    
        const {
            vault,
            workspace: {activeLeaf}
        } = this.app;
        
        const activeFile = activeLeaf 
            ? (activeLeaf.view as FileView).file?.path
            : null;

        this.map = new LocalGraph({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          target: (this as any).contentEl,
          props: {
              activeFile
          },
        });
    }
}