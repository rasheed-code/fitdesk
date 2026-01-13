/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `start-workout` command */
  export type StartWorkout = ExtensionPreferences & {}
  /** Preferences accessible in the `browse-exercises` command */
  export type BrowseExercises = ExtensionPreferences & {}
  /** Preferences accessible in the `view-statistics` command */
  export type ViewStatistics = ExtensionPreferences & {}
  /** Preferences accessible in the `exercise-reminder` command */
  export type ExerciseReminder = ExtensionPreferences & {
  /** Reminder Interval - How often to remind you to exercise */
  "reminderInterval": "30" | "45" | "60" | "90" | "120"
}
}

declare namespace Arguments {
  /** Arguments passed to the `start-workout` command */
  export type StartWorkout = {}
  /** Arguments passed to the `browse-exercises` command */
  export type BrowseExercises = {}
  /** Arguments passed to the `view-statistics` command */
  export type ViewStatistics = {}
  /** Arguments passed to the `exercise-reminder` command */
  export type ExerciseReminder = {}
}

