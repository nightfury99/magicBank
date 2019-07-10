<template>
    <div class="app-container">
        <calendar-view
            :show-date="showDate"
            class="theme-default"
            :events="events">
            <calendar-view-header
                slot="header"
                slot-scope="t"
                :header-props="t.headerProps"
                @input="handleShowDate" />
        </calendar-view>
    </div>
</template>

<script>
import moment from 'moment'
import { getAssignmentFilterByMonth } from '@/api/assignment'
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
require("vue-simple-calendar/static/css/default.css")

export default {
    data() {
        return {
            assignments: [],
            showDate: new Date(),
            events: [],
        }
    },

    created() {
        let m = moment()
        this.getMonthlyAssignment(m.month() + 1, m.weekYear())
    },

    components: {
        CalendarView,
        CalendarViewHeader,
    },

    methods: {
        handleShowDate(date) {
            this.showDate = date

            let m = moment(date)
            this.getMonthlyAssignment(m.month() + 1, m.weekYear())
        },

        getMonthlyAssignment: function(month, year) {
            getAssignmentFilterByMonth({
                month: month,
                year: year,
            })
            .then(resp => {
                resp.data.data.forEach(data => {
                    this.events.push({
                        id: data.id,
                        title: data.title,
                        startDate: data.start_at,
                        endDate: data.end_at
                    })
                })
            })
        },
    }
}
</script>

<style>
.app-container {
        height: 97vh;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
}
</style>

