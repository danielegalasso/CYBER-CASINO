export class SlotMachine {
    private slotType: string;
    private numReels: number;
    private numIcons: number;
    private time_per_icon: number;
    private elementPositions: Map<string, number[]>;

    private slot_size_percent: number;
    private slot_padding: number;
    private slot_gradient_degree: string;
    private slot_start_color: string;
    private slot_end_color: string;
    private slot_rect_color: string;
    private win_start_color: string;
    private win_end_color: string;

    constructor (slotType: string,
                         numReels: number,
                         numIcons: number,
                         time_per_icon: number,
                         elementPositions: Map<string, number[]>,
                         slot_size_percent: number,
                         slot_padding: number,
                         slot_gradient_degree: string,
                         slot_start_color: string,
                         slot_end_color: string,
                         slot_rect_color: string,
                         win_start_color: string,
                         win_end_color: string)
    {
        this.slotType = slotType;
        this.numReels = numReels;
        this.numIcons = numIcons;
        this.time_per_icon = time_per_icon;
        this.elementPositions = elementPositions;
        this.slot_size_percent = slot_size_percent;
        this.slot_padding = slot_padding;
        this.slot_gradient_degree = slot_gradient_degree;
        this.slot_start_color = slot_start_color;
        this.slot_end_color = slot_end_color;
        this.slot_rect_color = slot_rect_color;
        this.win_start_color = win_start_color;
        this.win_end_color = win_end_color;
    }

    get SlotType(): string {
        return this.slotType;
    }

    get NumReels(): number {
        return this.numReels;
    }

    get NumIcons(): number {
        return this.numIcons;
    }

    get TimePerIcon(): number {
        return this.time_per_icon;
    }

    get ElementPositions(): Map<string, number[]> {
        return this.elementPositions;
    }

    get SlotSizePercent(): number {
        return this.slot_size_percent;
    }

    get SlotPadding(): number {
        return this.slot_padding;
    }

    get SlotGradientDegree(): string {
        return this.slot_gradient_degree;
    }

    get SlotStartColor(): string {
        return this.slot_start_color;
    }

    get SlotEndColor(): string {
        return this.slot_end_color;
    }

    get SlotRectColor(): string {
        return this.slot_rect_color;
    }

    get WinStartColor(): string {
        return this.win_start_color;
    }

    get WinEndColor(): string {
        return this.win_end_color;
    }
}


export class SlotMachineBuilder {
    private slotType?: string;
    private numReels?: number;
    private numIcons?: number;
    private time_per_icon?: number;
    private elementPositions?: Map<string, number[]>;

    private slot_size_percent?: number;
    private slot_padding?: number;
    private slot_gradient_degree?: string;
    private slot_start_color?: string;
    private slot_end_color?: string;
    private slot_rect_color?: string;
    private win_start_color?: string;
    private win_end_color?: string;

    constructor() { }

    public setSlotType(slotType: string): SlotMachineBuilder {
        this.slotType = slotType;
        return this;
    }

    public setNumReels(numReels: number): SlotMachineBuilder {
        this.numReels = numReels;
        return this;
    }

    public setNumIcons(numIcons: number): SlotMachineBuilder {
        this.numIcons = numIcons;
        return this;
    }

    public setTimePerIcon(time_per_icon: number): SlotMachineBuilder {
        this.time_per_icon = time_per_icon;
        return this;
    }

    public setElementPositions(elementPositions: Map<string, number[]>): SlotMachineBuilder {
        this.elementPositions = elementPositions;
        return this;
    }

    public setSlotSizePercent(slot_size_percent: number): SlotMachineBuilder {
        this.slot_size_percent = slot_size_percent;
        return this;
    }

    public setSlotPadding(slot_padding: number): SlotMachineBuilder {
        this.slot_padding = slot_padding;
        return this;
    }

    public setSlotGradientDegree(slot_gradient_degree: string): SlotMachineBuilder {
        this.slot_gradient_degree = slot_gradient_degree;
        return this;
    }

    public setSlotStartColor(slot_start_color: string): SlotMachineBuilder {
        this.slot_start_color = slot_start_color;
        return this;
    }

    public setSlotEndColor(slot_end_color: string): SlotMachineBuilder {
        this.slot_end_color = slot_end_color;
        return this;
    }

    public setSlotRectColor(slot_rect_color: string): SlotMachineBuilder {
        this.slot_rect_color = slot_rect_color;
        return this;
    }

    public setWinStartColor(win_start_color: string): SlotMachineBuilder {
        this.win_start_color = win_start_color;
        return this;
    }

    public setWinEndColor(win_end_color: string): SlotMachineBuilder {
        this.win_end_color = win_end_color;
        return this;
    }

    public build(): SlotMachine {
        //check if all properties are set
        if (this.slotType === undefined) {
            throw new Error("SlotType is not set");
        }
        if (this.numReels === undefined) {
            throw new Error("NumReels is not set");
        }
        if (this.numIcons === undefined) {
            throw new Error("NumIcons is not set");
        }
        if (this.time_per_icon === undefined) {
            throw new Error("TimePerIcon is not set");
        }
        if (this.elementPositions === undefined) {
            throw new Error("ElementPositions is not set");
        }
        if (this.slot_size_percent === undefined) {
            throw new Error("SlotSizePercent is not set");
        }
        if (this.slot_padding === undefined) {
            throw new Error("SlotPadding is not set");
        }
        if (this.slot_gradient_degree === undefined) {
            throw new Error("SlotGradientDegree is not set");
        }
        if (this.slot_start_color === undefined) {
            throw new Error("SlotStartColor is not set");
        }
        if (this.slot_end_color === undefined) {
            throw new Error("SlotEndColor is not set");
        }
        if (this.slot_rect_color === undefined) {
            throw new Error("SlotRectColor is not set");
        }
        if (this.win_start_color === undefined) {
            throw new Error("WinStartColor is not set");
        }
        if (this.win_end_color === undefined) {
            throw new Error("WinEndColor is not set");
        }

        return new SlotMachine(this.slotType,
                               this.numReels,
                               this.numIcons,
                               this.time_per_icon,
                               this.elementPositions,
                               this.slot_size_percent,
                               this.slot_padding,
                               this.slot_gradient_degree,
                               this.slot_start_color,
                               this.slot_end_color,
                               this.slot_rect_color,
                               this.win_start_color,
                               this.win_end_color);
    }
}