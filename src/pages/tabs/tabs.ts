import { Component } from '@angular/core';

import { BreathePage } from '../breathe/breathe';
import { FocusPage } from '../focus/focus';
import { PerspectivePage } from '../perspective/perspective';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BreathePage;
  tab2Root = PerspectivePage;
  tab3Root = FocusPage;

  constructor() {

  }
}