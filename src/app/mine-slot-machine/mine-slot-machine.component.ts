import { Component } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from '../model/Games/slotMachine';

@Component({
  selector: 'app-mine-slot-machine',
  templateUrl: './mine-slot-machine.component.html',
  styleUrl: './mine-slot-machine.component.scss'
})
export class MineSlotMachineComponent {
  readonly mineElementPosition: Map<string, number[]> = new Map<string, number[]>([
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

  mineSlot: SlotMachine = this.createMineSlot();

  private createMineSlot(): SlotMachine {
    let mineSlotBuilder = new SlotMachineBuilder();
    mineSlotBuilder.setSlotType("mine")
                  .setNumReels(4)
                  .setNumIcons(12)
                  .setTimePerIcon(80)
                  .setElementPositions(this.mineElementPosition)
                  .setSlotSizePercent(200)
                  .setSlotPadding(0.30)
                  .setSlotGradientDegree('130deg')
                  .setSlotStartColor('SlateBlue')
                  .setSlotEndColor('Indigo')
                  .setSlotRectColor('rgb(255, 255, 0)')
                  .setWinStartColor('rgb(255, 165, 0)')
                  .setWinEndColor('rgb(255, 255, 0)')
                  .setBackgroundImg("url(../assets/SlotBg/Miniera.png)")
    
    return mineSlotBuilder.build();
  }
}