import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

})
export class DatepickerComponent {

  
  showCalendar: boolean = false;
  showMonthSelection: boolean = false;
  showYearSelection: boolean = false;
  showCalendarDays: boolean = true;

  selectedDate: Date = new Date();
  calendarDays: { date: Date; disabled: boolean; isToday: boolean }[] = [];
  temp!: any;
  displayedYears: number[] = [];
  yearSetSize: number = 24;
  years: number[] = []
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  constructor() {
    this.generateCalendar();
    this.generateYears()
  }

  public generateCalendar(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date()
    const startDate = new Date(firstDay);

    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    this.calendarDays = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const disabled = currentDate.getMonth() !== month || currentDate.getFullYear() !== year;
      const isToday = currentDate.toDateString() === today.toDateString();

      this.calendarDays.push({
        date: new Date(currentDate),
        disabled: disabled,
        isToday: isToday
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  //toggling the calendar
  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    this.showMonthSelection = false
    this.showYearSelection = false
  }

  //On click of the month in the calendar it displays all the months to select
  toggleMonthSelection() {
    this.showMonthSelection = !this.showMonthSelection;
    this.showYearSelection = false;
    this.showCalendarDays = !this.showMonthSelection;

    if (!this.showMonthSelection) {
      this.showCalendarDays = true;
      this.generateCalendar();
    }
  }

  //On click of the year in the calendar it displays all the set of years to select
  toggleYearSelection() {
    this.showYearSelection = !this.showYearSelection;
    this.showMonthSelection = false;
    if (this.showYearSelection) {
      const currentYear = this.getCurrentYear();
      const startYear = Math.floor(currentYear / this.yearSetSize) * this.yearSetSize;
      const endYear = startYear + this.yearSetSize - 1;
      this.displayedYears = this.years.filter(year => year >= startYear && year <= endYear);
    }
    this.showCalendarDays = !this.showYearSelection;
    if (!this.showYearSelection) {
      this.showCalendarDays = true;
      this.generateCalendar();
    }
  }
  
  markSelectedDate(event: any): void {
    const input = event.trim();
    const datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (datePattern.test(input)) {
      const parts = input.split('/');
      const day = +parts[0];
      const month = +parts[1] - 1;
      const year = +parts[2]; 
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const selectedDate = new Date(year, month, day);
        if (!isNaN(selectedDate.getTime())) {
          this.temp = selectedDate;
          this.selectedDate = selectedDate;
          this.generateCalendar();
          return;
        }
      }
    }
      this.temp = undefined;
  }
  
  isDaySelected(date: Date): boolean {
    if (this.temp) {
      const selectedDate = new Date(this.temp);
      return (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      );
    }
    return false;
  }
  
  selectDate(date: Date): void {
    this.temp = date
    this.showCalendar = false;
  }

  selectMonth(month: number): void {
    this.selectedDate.setMonth(month);
    this.showCalendarDays = true;
    this.showMonthSelection = false;
    this.generateCalendar();
    this.showCalendar = true;
  }

  getSelectedMonth(): string {
    return this.showMonthSelection ? this.months[this.selectedDate.getMonth()] : this.selectedDate.toLocaleString('default', { month: 'short' });
  }
  
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  selectYear(year: number) {
    this.selectedDate = new Date(year, this.selectedDate.getMonth(), 1);
    this.generateCalendar();
    this.showCalendarDays = true;
    this.showYearSelection = false;
    this.showCalendar = true
  }

  //To generate set of years 
  generateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 100;

    this.years = Array(endYear - startYear + 1)
      .fill(startYear)
      .map((value, index) => value + index);
    this.displayedYears = this.years.slice(0, this.yearSetSize);
  }

  //To get the previous and next month,year 
  previousYearSet(): void {
    const currentIndex = this.years.indexOf(this.displayedYears[0]);
    const newIndex = Math.max(0, currentIndex - this.yearSetSize);
    this.displayedYears = this.years.slice(newIndex, newIndex + this.yearSetSize);
  }

  nextYearSet(): void {
    const currentIndex = this.years.indexOf(this.displayedYears[0]);
    const newIndex = Math.min(this.years.length - this.yearSetSize, currentIndex + this.yearSetSize);
    this.displayedYears = this.years.slice(newIndex, newIndex + this.yearSetSize);
  }

  previousMonth(): void {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() - 1,
      this.selectedDate.getDate()
    );
    this.generateCalendar();
  }

  nextMonth(): void {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      this.selectedDate.getDate()
    );
    this.generateCalendar();
  }

  //To get close of the caelndar on selection of the date and on click outside of the calendar
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
  
    const isInsideCalendar = this.isInsideCalendar(targetElement);
    const isInsideMonthSelection = targetElement.closest('.month-selection') !== null;
    const isInsideYearSelection = targetElement.closest('.year-selection') !== null;

    if (!isInsideCalendar && !isInsideMonthSelection && !isInsideYearSelection) {
      this.showCalendar = false;
    }
  }
  private isInsideCalendar(targetElement: HTMLElement): boolean {
    return targetElement.closest('.datepicker') !== null;
  }
}
