<template>
    <div class="app-container">
        <div class="crm-box-container">
            <div class="crm-box-content">
                <vue-cal style="height: 100%"
                    default-view="month"
                    today-button
                    :disable-views="['years', 'year']"
                    :events="events"
                    :no-event-overlaps="true"
                    events-on-month-view="short"
                    @view-change="handleChangeView"/>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getAssignmentFilterByMonth } from '@/api/assignment'

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    data() {
        return {
            events: [],
        }
    },

    created() {
        let m = moment()
        this.getMonthlyAssignment(
            m.startOf('month').format('YYYY-MM-DD'), 
            m.endOf('month').format('YYYY-MM-DD'));
    },

    components: {
        VueCal,
    },

    methods: {

        getMonthlyAssignment: function(start, end) {
            
            this.events = []

            getAssignmentFilterByMonth({
                from_date: start,
                to_date: end,
            })
            .then(resp => {
                resp.data.data.forEach(data => {
                    this.events.push({
                        title: data.title,
                        content: data.title,
                        start: moment(data.start_at).format('DD-MM-YYYY hh:mm'),
                        end: moment(data.end_at).format('DD-MM-YYYY hh:mm'),
                        class: 'sport'
                    })
                })
            })
        },

        handleChangeView: function(event) {
            this.getMonthlyAssignment(
                event.startDate,
                event.endDate,
            )
        }
    }
}
</script>

<style>
.vuecal--month-view .vuecal__cell {height: 80px;}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {padding: 4px;}
.vuecal--month-view .vuecal__no-event {display: none;}

.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</style>

