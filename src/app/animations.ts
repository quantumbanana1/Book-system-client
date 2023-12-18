import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const fade2 = trigger("fade", [
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
  transition(":leave", [
    style({ opacity: "1" }),
    animate("300ms ease-out", style({ opacity: "0" })),
  ]),
  transition(":enter", [
    query(
      "#commentform-edit",
      animate("0ms ease-out", style({ opacity: "0" })),
    ),
    style({ opacity: "0", transform: "translateY(-50%)" }),
    animate(
      "250ms ease-in-out",
      style({
        opacity: "1",
        position: "absolute",
        transform: "translateY(*)",
      }),
    ),
    query(
      "#commentform-edit",
      animate("200ms ease-in", style({ opacity: "1" })),
    ),
  ]),
]);

export const slideOutAnimation = trigger("slideOutAnimation", [
  transition(":enter", [
    style({ opacity: 0, transform: "translateX(100%)" }),
    animate(".75s ease", style({ opacity: 1, transform: "translateX(*)" })),
  ]),
  transition(":leave", [
    animate(".75s ease", style({ opacity: 0, transform: "translateX(100%)" })),
  ]),
]);
