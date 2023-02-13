import dayjs from "dayjs";

export class Tick {

	constructor(private ganttTimeDuration: number, private startDateGantt: dayjs.Dayjs) { }

	value() {
		let ticks = [] as Array<{ start: string; left: string }>;
		let add = 0;
		let numTicks = 6;
		const ganttTimeDuration7d = 1000 * 60 * 60 * 24 * 7;
		const ganttTimeDuration20h = 1000 * 60 * 60 * 20;
		const ganttTimeDuration6m = 1000 * 60 * 6;
		const tickDurationAccumulator = this.ganttTimeDuration / numTicks;
		for (let i = 0; i <= numTicks; i++) {
			const leftPercentage =
				((tickDurationAccumulator * 100) / this.ganttTimeDuration).toFixed(2);
			add += tickDurationAccumulator;
			const has = this.startDateGantt.add(i * tickDurationAccumulator, 'millisecond');

			const time = calcTime(has, this.ganttTimeDuration);
			ticks.push({
				start: time,
				left: leftPercentage,
			});
		}

		if (this.maxZoomReached(ticks)) {
			console.error('Error max zoom')
		}

		return ticks;

		function calcTime(has: dayjs.Dayjs, ganttTimeDuration: any) {
			if (ganttTimeDuration > ganttTimeDuration7d) {
				return has.format('D/M');
			} else if (ganttTimeDuration > ganttTimeDuration20h) {
				return has.format('D/M H:mm');
			} else if (ganttTimeDuration > ganttTimeDuration6m) {
				return has.format('D/M H:mm');
			} else {
				return has.format('D/M HH:mm:ss');
			}
		}
	}

	private maxZoomReached(ticks: Array<{ start: string; left: string }>) {
		return (
			ticks.reduce((prevTick, currTick) => {
				const isTickRepeated = prevTick.find(
					(tick) => tick?.start === currTick.start
				);
				if (isTickRepeated) {
					return prevTick;
				}
				prevTick.push(currTick);
				return prevTick;
			}, [] as Array<{ start: string; left: string }>).length == ticks.length
		);
	}
} 