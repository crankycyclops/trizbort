import { Subscriber, Dispatcher } from '../../Dispatcher';
import { AppEvent, MouseMode } from '../../enums'
import { App } from '../../App'
import { OptionsGroup } from '../../controls';

export class ToolPanel extends OptionsGroup implements Subscriber {
  protected elem: HTMLElement;

  constructor() {
    let elem = document.getElementById('toolpanel');

    super(elem, [
      {value: MouseMode.None, htmlEl: '#toolpanel .tool-none'},
      {value: MouseMode.AddRoom, htmlEl: '#toolpanel .tool-room'},
      {value: MouseMode.AddNote, htmlEl: '#toolpanel .tool-note'},
      {value: MouseMode.AddBlock, htmlEl: '#toolpanel .tool-block'},
    ]);

    Dispatcher.subscribe(this);

    this.value = MouseMode.None;
  }

  get template(): string {
    return Handlebars.templates.ToolPanel({});
  }

  set value(val: MouseMode) {
    this.setValue(val);
    App.mouseMode = val;
  }

  notify(event: AppEvent, obj: any) {
    if(event == AppEvent.Added) {
      this.value = MouseMode.None;
    }
  }
}
