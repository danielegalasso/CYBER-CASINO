import { Component } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from '../model/slotMachine';

@Component({
  selector: 'app-premium-slot-machine',
  templateUrl: './premium-slot-machine.component.html',
  styleUrl: './premium-slot-machine.component.scss'
})
export class PremiumSlotMachineComponent {
  readonly premiumElemPosition: Map<string, number[]> = new Map<string, number[]>([
    ['peach', [0, 9, 10, 9, 3]],
    ['bag', [1, 5, 6, 11, 7]],
    ['bar', [2, 11, 5, 2, 8]],
    ['melon', [3, 4, 4, 10, 10]],
    ['apple', [4, 6, 11, 8, 6]],
    ['cherry', [5, 2, 3, 3, 11]],
    ['ruby', [6, 3, 0, 4, 4]],
    ['lemon', [7, 7, 9, 0, 0]],
    ['777', [8, 1, 8, 7, 9]],
    ['banana', [9, 0, 1, 1, 2]],
    ['grape', [10, 10, 2, 5, 5]],
    ['strawberry', [11, 8, 7, 6, 1]]
  ]);

  premiumSlot: SlotMachine = this.createPremiumSlot();

  createPremiumSlot(): SlotMachine {
    let premiumSlotBuilder = new SlotMachineBuilder();
    premiumSlotBuilder.setSlotType("premium")
                  .setNumReels(5)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.premiumElemPosition)
                  .setSlotSizePercent(160)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('yellow')
                  .setSlotEndColor('BlueViolet')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)')
                  .setBackgroundImg("url(../assets/SlotBg/Paradiso.png)")
    
    return premiumSlotBuilder.build();
  }
}
