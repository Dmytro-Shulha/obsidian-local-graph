import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';

import LocalGraphView from './ui/view/localGraph';
import { VIEW_TYPE_CUSTOM_LOCAL_GRAPH } from './utils/constants';

// Remember to rename these classes and interfaces!

interface LocalGraphPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: LocalGraphPluginSettings = {
	mySetting: 'default'
}

export default class LocalGraphPlugin extends Plugin {
	settings: LocalGraphPluginSettings;
	private view: LocalGraphView;


	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_CUSTOM_LOCAL_GRAPH,
			(leaf: WorkspaceLeaf) => (this.view = new LocalGraphView(leaf))
		);

		this.addCommand({
			id: "show-custom-local-graph-view",
			name: "Open view",
			checkCallback: (checking: boolean) => {
			  if (checking) {
				return (
				  this.app.workspace.getLeavesOfType(VIEW_TYPE_CUSTOM_LOCAL_GRAPH).length === 0
				);
			  }
			  this.initLeaf();
			},
		  });

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LocalGraphSettingTab(this.app, this));
	}

	onunload() {

	}

	initLeaf(): void {
		if (this.app.workspace.getLeavesOfType(VIEW_TYPE_CUSTOM_LOCAL_GRAPH).length) {
			return;
		  }
		  this.app.workspace.getLeaf(false).setViewState({
			type: VIEW_TYPE_CUSTOM_LOCAL_GRAPH,
		  });
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class LocalGraphSettingTab extends PluginSettingTab {
	plugin: LocalGraphPlugin;

	constructor(app: App, plugin: LocalGraphPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
