<template>
  <div class="w-screen flex justify-center items-center gap-4 px-40 py-10">
    <div class="bg-emerald-200 w-fit flex flex-col justify-center items-center gap-4 py-10 px-8 rounded-lg">
      <div v-if="!showConfirmation">
        <div class="text-2xl">
          Dr. {{ doctor.firstName }} {{ doctor.lastName }}
        </div>
        <div class="text-xl">
          {{ doctor.specialty }}
        </div>
        <div class="bg-green-400 p-5 rounded-t-lg shadow-lg flex justify-center items-center flex-col gap-4">
          <div>
            Fechas Disponibles
          </div>
          <div class="grid grid-cols-4 gap-10">
            <div
                :class="{'bg-cyan-100 outline outline-cyan-300': selectedDate.selectedDateStr === date}"
                class="px-1 py-2 bg-white rounded-md shadow-xl text-center hover:bg-cyan-100 cursor-pointer hover:outline hover:outline-cyan-300"
                v-for="date in upcomingAvailableDates" @click="selectedDate = {
            selectedDateStr: date,
            startTime: getTimeSlotsForDate(date, doctor.schedule).startTime,
            endTime: getTimeSlotsForDate(date, doctor.schedule).endTime
          }" :key="date">
              <div>{{ date }}</div>
              <div>{{ convertTo12Hours(getTimeSlotsForDate(date, doctor.schedule).startTime) }} -
                {{ convertTo12Hours(getTimeSlotsForDate(date, doctor.schedule).endTime) }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedDate"
             class="bg-green-400 rounded-b-lg shadow-lg p-5 justify-center items-center flex flex-col gap-4">
          <div
              class="bg-green-400  rounded-b-lg flex justify-center items-center flex-col gap-4 grid-cols-4 grid">
            <div
                :class="{'bg-cyan-100 outline outline-cyan-300': selectedTime === slot}"
                class="px-1 py-2 bg-white rounded-md shadow-xl text-center hover:bg-cyan-100 cursor-pointer hover:outline hover:outline-cyan-300"
                v-for="slot in generateDateTimeSlots(selectedDate?.selectedDateStr, selectedDate.startTime, selectedDate.endTime, bookedApts)"
                @click="selectedTime = slot">
              {{ convertTo12Hours(slot) }}
            </div>
          </div>
          <div>
            <button
                class="bg-white px-1 py-2 bg-white rounded-md shadow-xl text-center hover:bg-cyan-100 cursor-pointer hover:outline hover:outline-cyan-300 flex justify-center items-center px-4"
                @click="handleClick">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
                   xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div>{{ isLoading ? "Procesando..." : "Agendar Cita" }}</div>
            </button>
          </div>
        </div>
      </div>
      <div v-if="showConfirmation" class="flex flex-col gap-4">
        <div>
          Cita Confirmada para el dia:
          {{ formatDateTime(confirmation.dateTime) }}
        </div>
        <div class="bg-white px-1 py-2 bg-white rounded-md shadow-xl text-center hover:bg-cyan-100 cursor-pointer hover:outline hover:outline-cyan-300 flex justify-center items-center px-4">
          <NuxtLink to="/"> Regresar a Mis Citas </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAuthStore} from "~/store/auth";

const route = useRoute();
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const selectedDate = ref("");
const selectedTime = ref("");
const isLoading = ref(false);
const showConfirmation = ref(false)
const confirmation = ref("")


async function getDoctor() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/getDoctor?id=${route.params.id}`
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },

    });
    if (res) {
      console.log(res)
      return JSON.parse(JSON.stringify(res));
    }

  } catch (e) {
    console.error(e);
  }
}

const doctor = await getDoctor()

function generateNext14DaysInSpanish(schedule) {
  let dates = [];
  let today = new Date();

  for (let i = 0; i < 14; i++) {
    let futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + i);

    let dayOfWeek = futureDate.toLocaleDateString('en-US', {weekday: 'long'});

    // Check if the day is active in the doctor's schedule
    if (schedule[dayOfWeek] && schedule[dayOfWeek].active) {
      dates.push(futureDate.toLocaleDateString('es-ES', {weekday: 'long'}) + " " + futureDate.toLocaleDateString('es-ES', {hour12: true}));
    }
  }

  return dates;
}


// Using the function
let upcomingAvailableDates = generateNext14DaysInSpanish(doctor.schedule);
upcomingAvailableDates.forEach(date => {
  console.log(date);
});

function getTimeSlotsForDate(dateString, schedule) {
  // Spanish days of the week mapped to English
  const daysMap = {
    'lunes': 'Monday',
    'martes': 'Tuesday',
    'miércoles': 'Wednesday',
    'jueves': 'Thursday',
    'viernes': 'Friday',
    'sábado': 'Saturday',
    'domingo': 'Sunday'
  };

  // Extract the day of the week from the string
  let dayOfWeekSpanish = dateString.split(' ')[0].toLowerCase();

  // Translate to English
  let dayOfWeekEnglish = daysMap[dayOfWeekSpanish];

  // Check if the day is in the schedule
  if (schedule[dayOfWeekEnglish] && schedule[dayOfWeekEnglish].active) {
    return schedule[dayOfWeekEnglish].times;
  } else {
    return null;
  }
}

function generateDateTimeSlots(dateString, startTime, endTime, appointments) {
  let slots = [];

  // Extract the date part
  let datePart = dateString.split(' ').slice(1).join(' ');

  // Convert date format from "dd/mm/yyyy" to "mm/dd/yyyy"
  let [day, month, year] = datePart.split('/');
  let formattedDate = `${month}/${day}/${year}`;

  // Parse the start and end times with the date
  let startDateTime = new Date(`${formattedDate} ${startTime}`);
  let endDateTime = new Date(`${formattedDate} ${endTime}`);

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return 'Invalid date';
  }

  while (startDateTime < endDateTime) {
    let timeString = startDateTime.getHours().toString().padStart(2, '0') + ':' +
        startDateTime.getMinutes().toString().padStart(2, '0');

    let slotDateTime = new Date(`${formattedDate} ${timeString}`,);

    // Check if the time slot is not in any of the appointments
    let isSlotAvailable = !appointments.some(appointment => {
      let appointmentDate = new Date(appointment.dateTime);
      return slotDateTime.getTime() === appointmentDate.getTime();
    });

    if (isSlotAvailable) {
      slots.push(timeString);
    }

    startDateTime.setMinutes(startDateTime.getMinutes() + 30); // Assuming 30-minute intervals
  }

  return slots;
}

async function handleClick() {
  isLoading.value = true;
  await new Promise((r) => setTimeout(r, 1000))
  let datePart = selectedDate.value.selectedDateStr.split(' ')[1];

  // Split the datePart into day, month, and year
  let [day, month, year] = datePart.split('/');

  // Format the date in "YYYY-MM-DD" format
  let formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  // Combine date and time
  let dateTime = `${formattedDate}T${selectedTime.value}:00`; // Adding ":00" for seconds


  try {
    const res = await $fetch("https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/create", {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
      body:
          {
            userId: user.id,
            doctorId: doctor.id,
            dateTime: dateTime
          }

    });
    if (res) {
      console.log(res)
      confirmation.value = res
      isLoading.value = false;
      showConfirmation.value = true;
    }
  } catch (e) {
    console.error(e.message)
  }

}

async function getApts() {
  try {
    console.log(doctor.id)
    const res = await $fetch("https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getDoctorApts", {
      method: "get",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        doctorId: doctor.id
      }

    });
    if (res) {
      console.log(res)
      return res;
    }
  } catch (e) {
    console.error(e.message)
  }


}

const bookedApts = await getApts();

function formatDateTime(dateTimeString) {
  // Create a Date object from the dateTimeString
  let date = new Date(dateTimeString);

  // Options for toLocaleString to get day of the week, date, and time in 12-hour format
  let options = {
    weekday: 'long', // day of the week
    day: '2-digit',  // day in two digits
    month: '2-digit', // month in two digits
    year: '2-digit',  // two-digit year
    hour: 'numeric',  // hour
    minute: 'numeric', // minutes
    hour12: true  // 12-hour format
  };

  // Convert to Spanish locale
  return date.toLocaleString('es-ES', options);
}

function convertTo12Hours(timeString) {
  // Split the time string into hours and minutes
  let [hours, minutes] = timeString.split(':').map(Number);

  // Determine AM or PM
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; 

  // Return the formatted time string
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

</script>

<style scoped>

</style>