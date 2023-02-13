import * as dayjs from 'dayjs'
import { Tick } from './tick';

const ganttTimeDuration30d = 1000 * 60 * 60 * 24 * 30;
const ganttTimeDuration15d = 1000 * 60 * 60 * 24 * 15;
const ganttTimeDuration4d = 1000 * 60 * 60 * 24 * 4;
const ganttTimeDuration7d = 1000 * 60 * 60 * 24 * 7;
const ganttTimeDuration20h = 1000 * 60 * 60 * 20;
const ganttTimeDuration5h = 1000 * 60 * 60 * 5;
const ganttTimeDuration50m = 1000 * 60 * 50;
const ganttTimeDuration25m = 1000 * 60 * 25;
const ganttTimeDuration6m = 1000 * 60 * 6;
const ganttTimeDuration45s = 1000 * 45;

const startDateGantt = dayjs()
	.date(6)
	.hour(1)
	.minute(0)
	.second(0)
	.millisecond(0);

describe('Ticks', () => {

	it('should be able to render D/M format when ganttDuration is 15 days', () => {
		const ticks = new Tick(ganttTimeDuration15d, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("8/6");
		expect(ticks[1].start).toBe("11/6");
		expect(ticks[6].start).toBe("23/6");
	});

	it('should be able to render D/M H:mm format when ganttDuration is 7 days', () => {
		const ticks = new Tick(ganttTimeDuration7d, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("7/6 5:00");
		expect(ticks[1].start).toBe("8/6 9:00");
		expect(ticks[6].start).toBe("14/6 5:00");
	});

	it('should be able to render H:mm format when ganttDuration is 20 hours', () => {
		const ticks = new Tick(ganttTimeDuration20h, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("4:20");
		expect(ticks[1].start).toBe("7:40");
		expect(ticks[3].start).toBe("14:20");
		expect(ticks[6].start).toBe("0:20");
	});

	it('should be able to render HH:mm:ss format when ganttDuration is 6 minutes', () => {
		const ticks = new Tick(ganttTimeDuration6m, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("01:01:00");
		expect(ticks[1].start).toBe("01:02:00");
		expect(ticks[2].start).toBe("01:03:00");
		expect(ticks[3].start).toBe("01:04:00");
		expect(ticks[4].start).toBe("01:05:00");
		expect(ticks[5].start).toBe("01:06:00");
		expect(ticks[6].start).toBe("01:07:00");
	});

	it('should be able to render HH:mm:ss format when ganttDuration is 45 seconds', () => {
		const ticks = new Tick(ganttTimeDuration45s, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("01:00:07");
		expect(ticks[1].start).toBe("01:00:15");
		expect(ticks[2].start).toBe("01:00:22");
		expect(ticks[3].start).toBe("01:00:30");
		expect(ticks[4].start).toBe("01:00:37");
		expect(ticks[5].start).toBe("01:00:45");
		expect(ticks[6].start).toBe("01:00:52");
	});

	it('should be able to render D/M H:mm format when ganttDuration is 4 days', () => {
		const ticks = new Tick(ganttTimeDuration4d, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		console.log(ticks)
		expect(ticks[0].start).toBe("6/6 17:00");
		expect(ticks[1].start).toBe("7/6 9:00");
		expect(ticks[2].start).toBe("8/6 1:00");
		expect(ticks[3].start).toBe("8/6 17:00");
		expect(ticks[4].start).toBe("9/6 9:00");
		expect(ticks[5].start).toBe("10/6 1:00");
		expect(ticks[6].start).toBe("10/6 17:00");
	});

	it('should be able to render H:mm format when ganttDuration is 5 hours', () => {
		const ticks = new Tick(ganttTimeDuration5h, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("1:50");
		expect(ticks[1].start).toBe("2:40");
		expect(ticks[2].start).toBe("3:30");
		expect(ticks[3].start).toBe("4:20");
		expect(ticks[4].start).toBe("5:10");
		expect(ticks[5].start).toBe("6:00");
		expect(ticks[6].start).toBe("6:50");
	});

	it('should be able to render H:mm format when ganttDuration is 50 minutes', () => {
		const ticks = new Tick(ganttTimeDuration50m, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("1:08");
		expect(ticks[1].start).toBe("1:16");
		expect(ticks[2].start).toBe("1:25");
		expect(ticks[3].start).toBe("1:33");
		expect(ticks[4].start).toBe("1:41");
		expect(ticks[5].start).toBe("1:50");
		expect(ticks[6].start).toBe("1:58");
	});

	it('should be able to render D/M format when ganttDuration is 30 days', () => {
		const ticks = new Tick(ganttTimeDuration30d, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("11/6");
		expect(ticks[1].start).toBe("16/6");
		expect(ticks[2].start).toBe("21/6");
		expect(ticks[3].start).toBe("26/6");
		expect(ticks[4].start).toBe("1/7");
		expect(ticks[5].start).toBe("6/7");
		expect(ticks[6].start).toBe("11/7");
});

	it('should be able to render H:mm format when ganttDuration is 25 minutes', () => {
		const ticks = new Tick(ganttTimeDuration25m, startDateGantt).value();

		expect(ticks).toBeTruthy();
		expect(ticks.length).toBe(7);
		expect(ticks[0].start).toBe("1:04");
		expect(ticks[1].start).toBe("1:08");
		expect(ticks[2].start).toBe("1:12");
		expect(ticks[3].start).toBe("1:16");
		expect(ticks[4].start).toBe("1:20");
		expect(ticks[5].start).toBe("1:25");
		expect(ticks[6].start).toBe("1:29");
	});
});
