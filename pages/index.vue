<script setup lang="ts"></script>

<template>
  <div>
    <Button
      is-vertical
      class="absolute left-0 top-1/2 max-sm:top-[20%] -translate-y-[50%] -translate-x-[35%] !w-[17vw] max-sm:!w-[40vw] max-sm:h-[12vw] h-[5.5vw] !text-[1.3vw] max-sm:!text-[3.7vw]"
      >выбрать цвет</Button
    >

    <h2
      class="absolute font-nolimits max-sm:text-[13vw] max-sm:left-5 sm:top-10 text-[5vw] left-[20vw]"
    >
      логотип
    </h2>
    <img
      src="../assets/images/icons/burger.svg"
      alt="menu"
      class="absolute top-20 sm:left-20 w-[4vw] max-sm:right-5 max-sm:top-7 max-sm:w-12"
    />

    <img
      src="../assets/images/test/car-1.svg"
      alt="car"
      class="absolute max-sm:w-10/12 max-sm:right-5 max-sm:top-[23vh] z-10 w-[50vw] sm:left-1/2 sm:-translate-x-[75%] top-1/2 sm:-translate-y-[30%]"
    />

    <div
      class="w-5/12 flex flex-col justify-between pb-[3.5vw] max-sm:pb-[5vw] absolute pl-[4.7vw] pt-[3.5vw] pr-[3vw] max-sm:pr-0 max-sm:pl-[7vw] max-sm:pt-[17vw] right-0 bottom-0 h-screen bg-gradient-to-t from-primary_light to-primary_dark max-sm:w-full max-sm:h-[60%]"
    >
      <div>
        <h1
          class="font-nolimits text-[3.5vw] max-sm:text-[9vw] max-sm:leading-[7.5vw] leading-[3vw]"
        >
          антигравийная<br />
          пленка
        </h1>
        <p
          class="text-[1.20vw] max-sm:text-[3.7vw] font-normal max-w-[84%] mt-[2vw] max-sm:mt-[6vw] max-sm:max-w-[94%]"
        >
          Это тестовый контент, который не должен нести никакого смысла, лишь
          показать текст Тестовый контент, который не должен нести никакого
          смысла, лишь показать текст
        </p>
      </div>
      <div>
        <div
          class="flex justify-start gap-[2vw] max-sm:gap-[4vw] mb-[3vw] max-sm:mb-[8vw]"
        >
          <Button
            outline
            class="w-[15vw] max-sm:w-[45vw] max-sm:h-[15vw] max-sm:!text-[4vw] h-[4vw] !text-[1.2vw]"
            >подробнее</Button
          >
          <img
            src="../assets/images/icons/play.svg"
            alt="play"
            class="h-[4vw] max-sm:h-[15vw] cursor-pointer"
          />
        </div>
        <div
          class="flex justify-start gap-[2.5vw] max-sm:gap-[8vw] text-[1.15vw] max-sm:text-[4.2vw] underline font-semibold mb-[4vw] max-sm:mb-[17vw]"
        >
          <p>Наши контакты</p>
          <p>Товарная линейка</p>
        </div>

        <div class="flex items-center justify-between mr-[1vw] max-sm:mr-[8vw]">
          <p class="font-manrope tracking-wider text-[1.2vw] max-sm:text-[5vw]">
            01 / 06
          </p>
          <div class="flex gap-6">
            <img
              src="../assets/images/icons/arrow-left.svg"
              alt="arrow"
              class="w-[5vw] max-sm:w-[17vw]"
            />
            <img
              src="../assets/images/icons/arrow-right.svg"
              alt="arrow"
              class="w-[5vw] max-sm:w-[17vw]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
