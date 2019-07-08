<template>
    <div class="app-container">
        <full-calendar 
            defaultView="dayGridMonth" 
            :events="assignments" 
            :plugins="calendarPlugins"
            />
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'

import { getAssignmentFilterByMonth } from '@/api/assignment'

export default {
    data() {
        return {
            calendarPlugins: [ 
                dayGridPlugin,
                interactionPlugin
            ],
            assignments: [],
        }
    },

    components: {
        FullCalendar // make the <FullCalendar> tag available
    },

    created() {

    },

    methods: {
        getMonthlyAssignment: function(month, year) {
            getAssignmentFilterByMonth({
                month: month,
                year: year,
            })
            .then()
        },

        test: function (e) {
            console.log(e);
        }
    }
}
</script>

<style lang="scss">
    @import '@fullcalendar/core/main.css';
    @import '@fullcalendar/daygrid/main.css';
</style>

<style>
</style>

