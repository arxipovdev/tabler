import { shallowMount } from '@vue/test-utils'
import ScheduleComponent from '@/components/Schedule.vue'

const testDays1 = [
  { id: 955, startAt: '00:00', endAt: '23:59', dayOfWeek: 1 },
  { id: 956, startAt: '00:00', endAt: '23:59', dayOfWeek: 2 },
  { id: 957, startAt: '00:00', endAt: '23:59', dayOfWeek: 3 },
  { id: 958, startAt: '00:00', endAt: '23:59', dayOfWeek: 4 },
  { id: 959, startAt: '00:00', endAt: '23:59', dayOfWeek: 5 },
  { id: 960, startAt: '00:00', endAt: '23:59', dayOfWeek: 6 },
  { id: 960, startAt: '00:00', endAt: '23:59', dayOfWeek: 7 }
]
const testDays2 = [
  { id: 959, startAt: '22:00', endAt: '09:00', dayOfWeek: 5 },
  { id: 960, startAt: '22:00', endAt: '09:00', dayOfWeek: 6 }
]
const testDays3 = [
  { id: 955, startAt: '12:00', endAt: '17:00', dayOfWeek: 1 },
  { id: 956, startAt: '12:00', endAt: '17:00', dayOfWeek: 2 },
  { id: 957, startAt: '12:00', endAt: '17:00', dayOfWeek: 3 },
  { id: 958, startAt: '12:00', endAt: '17:00', dayOfWeek: 4 },
  { id: 959, startAt: '12:00', endAt: '17:00', dayOfWeek: 5 }
]
const testMerge1 = [
  { dayOfWeek: 1, name: 'Пн', time: 'Круглосуточно' },
  { dayOfWeek: 2, name: 'Вт', time: 'Круглосуточно' },
  { dayOfWeek: 3, name: 'Ср', time: 'Круглосуточно' },
  { dayOfWeek: 4, name: 'Чт', time: 'Круглосуточно' },
  { dayOfWeek: 5, name: 'Пт', time: 'Круглосуточно' },
  { dayOfWeek: 6, name: 'Сб', time: 'Круглосуточно' },
  { dayOfWeek: 7, name: 'Вс', time: 'Круглосуточно' }
]
const testMerge2 = [
  { dayOfWeek: 1, name: 'Пн', time: 'Выходной' },
  { dayOfWeek: 2, name: 'Вт', time: 'Выходной' },
  { dayOfWeek: 3, name: 'Ср', time: 'Выходной' },
  { dayOfWeek: 4, name: 'Чт', time: 'Выходной' },
  { dayOfWeek: 5, name: 'Пт', time: '22:00 - 09:00' },
  { dayOfWeek: 6, name: 'Сб', time: '22:00 - 09:00' },
  { dayOfWeek: 7, name: 'Вс', time: 'Выходной' }
]
const testMerge3 = [
  { dayOfWeek: 1, name: 'Пн', time: '12:00 - 17:00' },
  { dayOfWeek: 2, name: 'Вт', time: '12:00 - 17:00' },
  { dayOfWeek: 3, name: 'Ср', time: '12:00 - 17:00' },
  { dayOfWeek: 4, name: 'Чт', time: '12:00 - 17:00' },
  { dayOfWeek: 5, name: 'Пт', time: '12:00 - 17:00' },
  { dayOfWeek: 6, name: 'Сб', time: 'Выходной' },
  { dayOfWeek: 7, name: 'Вс', time: 'Выходной' }
]

describe('scheduleComponent', () => {
  const wrapper = shallowMount(ScheduleComponent)
  it('check function formatDays 1', () => {
    const days1 = wrapper.vm.formatDays(testDays1)
    expect(days1).toEqual([
      { dayOfWeek: 1, name: 'Пн', time: 'Круглосуточно' },
      { dayOfWeek: 2, name: 'Вт', time: 'Круглосуточно' },
      { dayOfWeek: 3, name: 'Ср', time: 'Круглосуточно' },
      { dayOfWeek: 4, name: 'Чт', time: 'Круглосуточно' },
      { dayOfWeek: 5, name: 'Пт', time: 'Круглосуточно' },
      { dayOfWeek: 6, name: 'Сб', time: 'Круглосуточно' },
      { dayOfWeek: 7, name: 'Вс', time: 'Круглосуточно' }
    ])
  })
  it('check function formatDays 2', () => {
    const days2 = wrapper.vm.formatDays(testDays2)
    expect(days2).toEqual([
      { dayOfWeek: 1, name: 'Пн', time: 'Выходной' },
      { dayOfWeek: 2, name: 'Вт', time: 'Выходной' },
      { dayOfWeek: 3, name: 'Ср', time: 'Выходной' },
      { dayOfWeek: 4, name: 'Чт', time: 'Выходной' },
      { dayOfWeek: 5, name: 'Пт', time: '22:00 - 09:00' },
      { dayOfWeek: 6, name: 'Сб', time: '22:00 - 09:00' },
      { dayOfWeek: 7, name: 'Вс', time: 'Выходной' }
    ])
  })
  it('check function formatDays 3', () => {
    const days3 = wrapper.vm.formatDays(testDays3)
    expect(days3).toEqual([
      { dayOfWeek: 1, name: 'Пн', time: '12:00 - 17:00' },
      { dayOfWeek: 2, name: 'Вт', time: '12:00 - 17:00' },
      { dayOfWeek: 3, name: 'Ср', time: '12:00 - 17:00' },
      { dayOfWeek: 4, name: 'Чт', time: '12:00 - 17:00' },
      { dayOfWeek: 5, name: 'Пт', time: '12:00 - 17:00' },
      { dayOfWeek: 6, name: 'Сб', time: 'Выходной' },
      { dayOfWeek: 7, name: 'Вс', time: 'Выходной' }
    ])
  })
  it('check function mergeDays 1', () => {
    const merge1 = wrapper.vm.mergeDays(testMerge1)
    expect(merge1).toEqual([
      { name: 'Пн - Вс', time: 'Круглосуточно' }
    ])
  })
  it('check function mergeDays 2', () => {
    const merge2 = wrapper.vm.mergeDays(testMerge2)
    expect(merge2).toEqual([
      { name: 'Пн, Вт, Ср, Чт, Вс', time: 'Выходной' },
      { name: 'Пт, Сб', time: '22:00 - 09:00' }
    ])
  })
  it('check function mergeDays 3', () => {
    const merge3 = wrapper.vm.mergeDays(testMerge3)
    expect(merge3).toEqual([
      { name: 'Пн - Пт', time: '12:00 - 17:00' },
      { name: 'Сб, Вс', time: 'Выходной' }
    ])
  })
})
