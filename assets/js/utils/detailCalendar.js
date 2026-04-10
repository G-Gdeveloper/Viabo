const MONTH_FORMATTER = new Intl.DateTimeFormat('es-CO', {
	month: 'long',
	year: 'numeric'
});

const DATE_FORMATTER = new Intl.DateTimeFormat('es-CO', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

const WEEKDAY_LABELS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

function toStartOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildDateParts(date) {
	return {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear()
	};
}

function toDate(parts) {
	return new Date(parts.year, parts.month - 1, parts.day);
}

function isSameDate(a, b) {
	if (!a || !b) {
		return false;
	}

	return a.day === b.day && a.month === b.month && a.year === b.year;
}

function isPastDate(parts, today) {
	return toDate(parts).getTime() < today.getTime();
}

function formatMonthLabel(monthIndex, year) {
	const text = MONTH_FORMATTER.format(new Date(year, monthIndex, 1));
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDisplayDate(parts) {
	return DATE_FORMATTER.format(toDate(parts));
}

function getMonthInfo(monthIndex, year) {
	const firstWeekDay = new Date(year, monthIndex, 1).getDay();
	const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
	const totalCells = firstWeekDay + daysInMonth;
	const trailingCells = (7 - (totalCells % 7)) % 7;

	return {
		firstWeekDay,
		daysInMonth,
		trailingCells
	};
}

function buildCalendarMarkup(state, options) {
	const { firstWeekDay, daysInMonth, trailingCells } = getMonthInfo(state.viewMonthIndex, state.viewYear);
	const today = options.today;

	const dayCells = [];

	for (let index = 0; index < firstWeekDay; index += 1) {
		dayCells.push('<span class="detail-day-placeholder" aria-hidden="true"></span>');
	}

	for (let day = 1; day <= daysInMonth; day += 1) {
		const parts = {
			day,
			month: state.viewMonthIndex + 1,
			year: state.viewYear
		};
		const selected = isSameDate(parts, state.selectedDate);
		const todayCell = isSameDate(parts, buildDateParts(today));
		const disabled = options.disablePastDates && isPastDate(parts, today);
		const classes = ['detail-day'];

		if (selected) {
			classes.push('is-selected');
		}

		if (todayCell) {
			classes.push('is-today');
		}

		if (disabled) {
			classes.push('is-disabled');
		}

		dayCells.push(`
			<button
				type="button"
				class="${classes.join(' ')}"
				data-calendar-day="${parts.day}"
				data-calendar-month="${parts.month}"
				data-calendar-year="${parts.year}"
				aria-label="${formatDisplayDate(parts)}${disabled ? ' no disponible' : ''}"
				aria-selected="${selected ? 'true' : 'false'}"
				${disabled ? 'aria-disabled="true" disabled' : ''}
			>
				${parts.day}
			</button>
		`);
	}

	for (let index = 0; index < trailingCells; index += 1) {
		dayCells.push('<span class="detail-day-placeholder" aria-hidden="true"></span>');
	}

	return `
		<div class="detail-calendar-shell" aria-label="Calendario de reserva">
			<div class="detail-calendar-toolbar">
				<button type="button" class="detail-calendar-nav" data-calendar-action="prev" aria-label="Mes anterior">&#10094;</button>
				<p class="detail-calendar-month">${formatMonthLabel(state.viewMonthIndex, state.viewYear)}</p>
				<button type="button" class="detail-calendar-nav" data-calendar-action="next" aria-label="Mes siguiente">&#10095;</button>
			</div>
			<div class="detail-calendar-head" aria-hidden="true">
				${WEEKDAY_LABELS.map((label) => `<span>${label}</span>`).join('')}
			</div>
			<div class="detail-calendar-grid" role="grid">
				${dayCells.join('')}
			</div>
		</div>
	`;
}

export function setupDetailCalendar(container, options = {}) {
	const today = toStartOfDay(new Date());
	const todayParts = buildDateParts(today);
	const initialDate = options.initialDate || todayParts;
	const initialMonthIndex = initialDate.month - 1;

	const state = {
		viewMonthIndex: initialMonthIndex,
		viewYear: initialDate.year,
		selectedDate: initialDate
	};

	const settings = {
		disablePastDates: options.disablePastDates !== false,
		onDateChange: options.onDateChange,
		today
	};

	function notifyDateChange() {
		if (typeof settings.onDateChange === 'function') {
			settings.onDateChange(state.selectedDate ? { ...state.selectedDate } : null);
		}
	}

	function render() {
		container.innerHTML = buildCalendarMarkup(state, settings);
	}

	container.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof HTMLElement)) {
			return;
		}

		const navButton = target.closest('[data-calendar-action]');
		if (navButton) {
			const action = navButton.getAttribute('data-calendar-action');
			if (action === 'prev') {
				state.viewMonthIndex -= 1;
				if (state.viewMonthIndex < 0) {
					state.viewMonthIndex = 11;
					state.viewYear -= 1;
				}
			}

			if (action === 'next') {
				state.viewMonthIndex += 1;
				if (state.viewMonthIndex > 11) {
					state.viewMonthIndex = 0;
					state.viewYear += 1;
				}
			}

			render();
			return;
		}

		const dayButton = target.closest('[data-calendar-day]');
		if (!dayButton || !(dayButton instanceof HTMLButtonElement) || dayButton.disabled) {
			return;
		}

		state.selectedDate = {
			day: Number(dayButton.getAttribute('data-calendar-day')),
			month: Number(dayButton.getAttribute('data-calendar-month')),
			year: Number(dayButton.getAttribute('data-calendar-year'))
		};

		render();
		notifyDateChange();
	});

	render();
	notifyDateChange();

	return {
		getSelectedDate() {
			return state.selectedDate ? { ...state.selectedDate } : null;
		}
	};
}

export function toIsoDate(parts) {
	if (!parts) {
		return '';
	}

	const month = String(parts.month).padStart(2, '0');
	const day = String(parts.day).padStart(2, '0');

	return `${parts.year}-${month}-${day}`;
}

export function toLongDate(parts) {
	if (!parts) {
		return '';
	}

	return formatDisplayDate(parts);
}
