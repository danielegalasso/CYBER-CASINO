import { Component } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from '../model/Games/slotMachine';

@Component({
  selector: 'app-fruit-slot-machine',
  templateUrl: './fruit-slot-machine.component.html',
  styleUrl: './fruit-slot-machine.component.scss'
})
export class FruitSlotMachineComponent {
  readonly fruitElemPosition: Map<string, number[]> = new Map<string, number[]>([
    ['banana', [1, 0, 5, 5, 10]],
    ['bar', [8, 9, 4, 11, 0]],
    ['blueberry', [5, 4, 9, 9, 1]],
    ['cherry', [7, 11, 8, 2, 4]],
    ['clover', [0, 8, 11, 3, 9]],
    ['crown', [4, 6, 1, 8, 7]],
    ['diamond', [6, 1, 7, 10, 11]],
    ['golden_cherry', [10, 3, 2, 1, 2]],
    ['golden_raspberry', [2, 10, 6, 4, 5]],
    ['orange', [9, 2, 3, 0,8]],
    ['raspberry', [3, 7, 0, 6, 6]],
    ['seven', [11, 5, 10, 7, 3]]
  ]);

  fruitSlot: SlotMachine = this.createFruitSlot();

  createFruitSlot(): SlotMachine {
    let fruitSlotBuilder = new SlotMachineBuilder();
    fruitSlotBuilder.setSlotType("fruit")
                  .setNumReels(4)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.fruitElemPosition)
                  .setSlotSizePercent(200)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('rgb(0, 4, 255)')
                  .setSlotEndColor('rgb(255, 0, 234)')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)')
                  .setBackgroundImg("url(../assets/SlotBg/TOPPP.png)")
    
    return fruitSlotBuilder.build();
  }
}
