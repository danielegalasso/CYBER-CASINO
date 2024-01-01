import { Component } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from './slot-machine/slotMachine';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'CyberCasino';

  fruitElemPosition: Map<string, number[]> = new Map<string, number[]>([
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

  premiumElemPosition: Map<string, number[]> = new Map<string, number[]>([
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

  mineElementPosition: Map<string, number[]> = new Map<string, number[]>([
    ['star', [0, 11, 3, 11]],
    ['lightning', [1, 9, 5, 3]],
    ['chest', [2, 0, 0, 8]],
    ['key', [3, 6, 2, 1]],
    ['lock', [4, 8, 1, 2]],
    ['coin', [5, 4, 6, 5]],
    ['red_gem', [6, 7, 10, 4]],
    ['hearth', [7, 2, 4, 9]],
    ['purple_gem', [8, 10, 7, 6]],
    ['bag', [9, 3, 11, 0]],
    ['green_gem', [10, 1, 8, 7]],
    ['shield', [11, 5, 9, 10]]
  ]);


  fruitSlot: SlotMachine = this.createFruitSlot();
  premiumSlot: SlotMachine = this.createPremiumSlot();
  mineSlot: SlotMachine = this.createMineSlot();


  createFruitSlot(): SlotMachine {
    let fruitSlotBuilder = new SlotMachineBuilder();
    fruitSlotBuilder.setSlotType("fruit")
                  .setNumReels(4)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.fruitElemPosition)
                  .setSlotSizePercent(100)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('rgb(0, 4, 255)')
                  .setSlotEndColor('rgb(255, 0, 234)')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)');
    
    return fruitSlotBuilder.build();
  }

  createPremiumSlot(): SlotMachine {
    let premiumSlotBuilder = new SlotMachineBuilder();
    premiumSlotBuilder.setSlotType("premium")
                  .setNumReels(5)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.premiumElemPosition)
                  .setSlotSizePercent(100)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('yellow')
                  .setSlotEndColor('BlueViolet')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)');
    
    return premiumSlotBuilder.build();
  }

  createMineSlot(): SlotMachine {
    let mineSlotBuilder = new SlotMachineBuilder();
    mineSlotBuilder.setSlotType("mine")
                  .setNumReels(4)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.mineElementPosition)
                  .setSlotSizePercent(100)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('SlateBlue')
                  .setSlotEndColor('Indigo')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)');
    
    return mineSlotBuilder.build();
  }
}