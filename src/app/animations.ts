import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const fade2 = trigger("fade", [
  // ...
  state(
    "visible",
    style({
      opacity: 1,
    }),
  ),
  state(
    "hidden",
    style({
      opacity: 0,
    }),
  ),
  transition("visible => hidden", [animate("200ms ease-out")]),
]);

export const popOut = trigger("inOutAnimation", [
  state("in", style({ opacity: 1 })),
  transition(":enter", [
    style({ opacity: "0" }),
    animate("250ms ease-in", style({ opacity: "1" })),
  ]),
  transition(":leave", [
    style({ opacity: "1" }),
    animate("100ms ease-out", style({ opacity: "0" })),
  ]),
]);
