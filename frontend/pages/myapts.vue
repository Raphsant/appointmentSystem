<script setup>
import {ref, onMounted} from 'vue';
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const apts = ref([]); // Define a reactive variable to store appointments

async function getApts() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getUserApts`;
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
      params: {
        userId: user.id
      }
    });
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function populateAptCard(id) {
  const doc = await useDoctors(id);
  return doc || {};
}

onMounted(async () => {
  const fetchedApts = await getApts();
  apts.value = await Promise.all(fetchedApts.map(async apt => {
    const doc = await populateAptCard(apt.doctorId);
    return {...apt, doctor: doc};
  }));
});

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
</script>

<template>
  <div class="w-screen h-1/2 flex flex-col justify-center items-center">
    <div class="w-1/2 flex justify-center items-center flex-col gap-4">
      <div class="text-3xl">
        Mis Citas
      </div>
      <div class="bg-emerald-600 w-full rounded-xl flex justify-center items-center place-items-center gap-10 p-4">
        <div>
          <div
              class="bg-cream/90 w-fit max-h-80 overflow-y-auto  flex flex-col p-4 gap-2 shadow-inner shadow-black rounded-lg m-1 justify-center items-center">
            <div
                class="rounded-lg w-[40rem] flex flex-col justify-center items-center bg-cream w-fit p-2 m-1 shadow-inner shadow-black/30 hover:shadow-lg hover:shadow-black/40 hover:bg-amber-50 cursor-pointer"
                v-for="apt in apts" :key="apt.id">
              <div>
                <div>
                  {{ apt?.doctor?.specialty }}
                </div>
                <div>
                  {{ apt?.doctor?.firstName }} {{ apt?.doctor?.lastName }}
                </div>
              </div>
              <div>
                <div>
                  {{ formatDateTime(apt.dateTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
