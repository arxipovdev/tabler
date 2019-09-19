<template>
  <div class="schedule" v-if="items">
    <div class="schedule__title">
      Часы работы <span class="schedule__main-status" :class="status ? 'main-status_open' : ''"> {{ status ? 'открыто' : 'закрыто' }}</span>
    </div>
    <div class="schedule__item" v-for="item in formatedSchedule" :key="item.id">
      <div class="schedule__name-wrapper">
        <div class="schedule__name">{{ item.name }}</div>
        <div class="schedule__status" v-if="!item.isMain">
          <div :class="item.status ? 'round_red' : 'round'"></div>{{ item.status ? 'открыто' : 'закрыто' }}
        </div>
      </div>
      <div class="schedule__date-wrapper" v-for="(day, i) in item.items" :key="day.name + '_' + i">
        <div class="schedule__day">{{ day.name }}</div>
        <div class="schedule__time">{{ day.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      nowTime: new Date(),
      days: [
        { id: 1, name: 'Пн' },
        { id: 2, name: 'Вт' },
        { id: 3, name: 'Ср' },
        { id: 4, name: 'Чт' },
        { id: 5, name: 'Пт' },
        { id: 6, name: 'Сб' },
        { id: 7, name: 'Вс' }
      ]
    }
  },
  mounted() {
    setInterval(() => { this.nowTime = new Date() }, 1000 * 60)
  },
  computed: {
    formatedSchedule() {
      let result = []
      if(!this.items) return []
      this.items.forEach(item => {
        let schedule = {
          name: '',
          isMain: true,
          status: false,
          items: []
        }
        if(!item.isMain) {
          schedule.isMain = false
          schedule.name = item.name
        }
        let days = this.formatDays(item.items)
        schedule.status = this.getStatus(days)
        schedule.items = this.mergeDays(days)

        result.push(schedule)
      })
      console.log(result)
      return result
    },
    status() {
      const main = this.formatedSchedule.find(i => i.isMain)
      return main ? main.status : false
    }
  },
  methods: {
    formatDays(items) {
      let workingDays = []
      this.days.forEach(day => {
        const currentDay = items.find(i => i.dayOfWeek === day.id)
        if(currentDay) {
          const isAroundTheClock = currentDay.startAt === '00:00' && currentDay.endAt === '23:59'
          workingDays.push({
            dayOfWeek: day.id,
            name: day.name,
            time: isAroundTheClock ? 'Круглосуточно' : `${currentDay.startAt} - ${currentDay.endAt}` })
        } else {
          workingDays.push({
            dayOfWeek: day.id,
            name: day.name,
            time: 'Выходной'
          })
        }
      })
      return workingDays
    },
    getStatus(dataArr) {
      const dayOfWeek = this.nowTime.getDay()
      if(dataArr) {
        const findDay = dataArr.find(i => i.dayOfWeek === dayOfWeek)
        if(!findDay) return false
        if(findDay.time === 'Выходной') return false
        if(findDay.time === 'Круглосуточно') return true
        else {
          const timesArr = findDay.time.split(' - ')
          if(timesArr.length !== 2) return false

          const startDate = new Date()
          const startHours = parseInt(timesArr[0].split(':')[0])
          const startMinutes = parseInt(timesArr[0].split(':')[1])
          startDate.setHours(startHours)
          startDate.setMinutes(startMinutes)

          const endDate = new Date()
          const endHours = timesArr[1].split(':')[0]
          const endMinutes = timesArr[1].split(':')[1]
          endDate.setHours(endHours)
          endDate.setMinutes(endMinutes)
          if(startHours > endHours) endDate.setDate(this.nowTime.getDate() + 1)

          return this.nowTime > startDate && this.nowTime < endDate
        }
      }
    },
    mergeDays(daysArr) {
      let result = []
      let times = []

      daysArr.forEach(day => {
        const isFound = times.find(time => time === day.time)
        if(!isFound) times.push(day.time)
      })

      times.forEach(time => {
        const dates = daysArr.filter(i => i.time === time)
        const count = dates.length
        let name = ''
        switch (count) {
          case 7:
            name = dates[0].name + ' - ' + dates[6].name
            result.push({ name, time })
            break
          case 2:
            name = dates[0].name + ', ' + dates[1].name
            result.push({ name, time })
            break
          default:
            let x = false
            for(let i = 0, j = 1; j < dates.length; i++, j++) {
              if(dates[i].dayOfWeek + 1 !== dates[j].dayOfWeek) x = true
            }
            if(x) {
              dates.forEach(day => {
                name += name !== '' ? ', ' + day.name : day.name
              })
            } else {
              name = dates[0].name + ' - ' + dates[dates.length - 1].name
            }
            result.push({ name, time })
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
.schedule {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  width: 610px;
  padding: 10px;
}
.schedule__title {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
}
.schedule__status {
  display: flex;
  align-items: center;
}
.schedule__status_open, .main-status_open {
  color: #EE514A;
}
.schedule__name-wrapper {
  display: flex;
  justify-content: space-between;
}
.schedule__date-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}
.schedule__item {
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  padding: 5px;
}
.schedule__item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.round, .round_red {
  width: 10px;
  height: 10px;
  background: #737373;
  border-radius: 50%;
  margin-right: 5px;
}
.round_red {
  background: #EE514A;
}
.round::before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  padding-top: 100%;
}
</style>
