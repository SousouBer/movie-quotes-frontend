<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
import IconLineVertical from "@/components/icons/IconLineVertical.vue";
import IconDotsThree from "@/components/icons/IconDotsThree.vue";
</script>

<template>
  <div class="pl-4 pr-16">
    <span class="font-medium text-2xl text-white">Movie description</span>
    <div class="mt-6 flex gap-6">
      <div>
        <img src="/images/dummy-poster.svg" alt="Movie Image" />
      </div>
      <div class="flex-1">
        <span class="font-medium text-2xl text-warm-gray"
          >COMMITMENT HASAN (1999)</span
        >
        <div class="flex flex-wrap gap-3 my-6">
          <BaseMovieChipGenre :showCancelButton="false" name="Adventure" />
          <BaseMovieChipGenre :showCancelButton="false" name="Science" />
          <BaseMovieChipGenre :showCancelButton="false" name="Horror" />
        </div>
        <p class="text-gray-300 font-bold text-lg">
          Director: <span class="text-white font-medium">NICK CASSAVETES</span>
        </p>
        <p class="text-lg text-gray-300 mt-4 leading-[27px]">
          In a nursing home, resident Duke reads a romance story to an old woman
          who has senile dementia with memory loss. In the late 1930s, wealthy
          seventeen year-old Allie Hamilton is spending summer vacation in
          Seabrook. Local worker Noah Calhoun meets Allie at a carnival
        </p>
      </div>
    </div>
    <div>
      <div class="relative flex items-center gap-8 my-8">
        <span class="text-2xl text-white">Quotes (Total 7) </span>
        <BaseMovieButton label="Add Quote">
          <IconMovieAdd />
        </BaseMovieButton>
        <IconLineVertical
          class="absolute top-1/2 left-[11.5rem] transform -translate-y-1/2"
        />
      </div>
      <div>
        <div class="bg-dark-shade-of-blue rounded-[10px] w-[60%] p-8">
          <div
            class="relative flex gap-10 items-center border-b border-[#EFEFEF33] pb-8"
          >
            <div>
              <img src="/images/dummy-quote-img.svg" alt="Quote picture" />
            </div>
            <span class="text-2xl text-gray-300"
              >"Frankly, my dear, I don'tgive a damn."
            </span>
            <IconDotsThree class="absolute top-0 right-0 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
