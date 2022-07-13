/*istanbul ignore file*/
import { MapIcon } from "../../map/models/MapIcon";
import { IndoorMapIconName } from "./models/IndoorMapIconName";

const indoorMapIcons: MapIcon[] = [
  {
    name: IndoorMapIconName.VENUE_MARKER_ICON,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.VENUE_UNIT,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.SMALL_VENUE_UNIT,
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAB7CAAAewgFu0HU+AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABEVJREFUWIXN2EtMVFccx/HvITPVgoUZSEBeCphoaAkhMIy0WiwkWEJiCCQkdNGNizY2adKYuGli0kY3fSTddFFTFnXlAoMUhdQ01tiU1yggxI2AKFp5Dz4SLHNn4N/FncMM00EHZGb6W/3v5V7mM3fuPef8L/xPo7ZykoikA0eBQ0AhkAvYAQNwAwvAINADXFdKLWyLdgOMEpE6EekSEZ9EHo+IXBSR2s18XkRXTEQOAj8CDr1vemaW0bF7PJ6aYm7ejddrAIqkpERsKSnk7c1lX34eGRnpwf/qBnBSKTX4WjARsQJngFNAgmF46XPdoru3n+mZ2Ui+E7k5WVQ4y3n3oAOLxQKwCpwFvlZKrW4aJiLJQDtQBTAwNEx7RxfPnj+PCBSatFQ79cfqKCku0rt+A5qVUs8ihvlR1wCHx2NwobWNwaHhLYFCU+Eso6mxHqvVCtANfKiUWnolzP/zXQWqlpZe8FPLL0w+fLQtKJ29e3L57NPjvLlzJ8DvQJ1Syhd8TEKY884AVR6PERUUwOTDR5xrOY9heAFqgC9Dj1kH8z99pwAutLZFBaUzcf8BFy/9qjdPi0h5WJiIKMwhIWFgaHjb7qmXpc81wO2ROwAW4LuwMKAWcBiGl/aOrqijdNo7OvGtrAAcEZHqcLDPAfpcN7c8JGwli0+e0u+6pTe/WAfzz301AH/19McMpdPd69LlUf9QtXbFagDL1PQMM7NzMYf9/XiK+QU3wA6gLhh2GGBsfCLmKJ27o2O6LIcA7G0w5fHK1PTa3FsEAdgegAX3YhxIZubm5nVZAAHYWwDLnuU4kMx4fV5dvgEBmA8gQYWboWITn29FlzsgAHMDJCUmxoFkZteuJF0uQgA2D2CzJceBZMZus+lyEgKwQTCXI/FKTnamLschAOsF2FeQHweSmcID+3X5BwRg1wFjd0Y6uTlZMUdlZ2WSlpYK5kMYgPn7vssAFc7yjc6PWo68/54ur+geIHh8+BmgwukgLdUeM5TdlkJZaYne/EEXazCl1FXghtVqof5YXcxgTY31WM22rkcp9ed/YP6cBFZLiouocJZFHeV0lFL0TiGAFzgR/Ld1MH+HfBbMbxLN4aMgP4/mpga9+a1SamSdJfQEEUkAOoHaf5aXOddynon7D7Yd9cnxj0k0Z5rLQINSaiX4mI0a3hTgCnDYMAxa2zrovzmwLSino5Tmpgb9usAFVEfU8AbhkoBL+Jfct0fu0N7RyeKTp1sC2W0pNDXW63sKzCv1UTjUS2F+nAWzGT0NWHwrK/S7btHd64p4UZmVuZsPKg9RVlqinz4v8A3wVejPFzEsCFgOfA9U6n3zC27ujo4xNT3DgnuRpaUXgLlKsNts5GRnUnhgvx7RdXqAE6E3+mtHRKpFpENEljfx4s4rIm0iUvnqTwhkq686kzG7GQdQDORjDj0pwBzm0mUcc967ppSKXaMa7fwLjB/Z6w3DWSwAAAAASUVORK5CYII=",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_ELEVATOR,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_ESCALATOR,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_STAIRS,
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAB7CAAAewgFu0HU+AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABR1JREFUaIHNml1oHFUUx/9n9qabaiTToDY+WEjWj1paFEERktgpmd1NxA8o3SChrS+hYH1QhFQFq7UFH2SloKlofdI+iKwlKAZNOrNpjTEmZcVqW4OYFPVBVsxusqCYZnaOD3a3k2Q/ZmZnN/k93bn3nHv+Z+fuzL13LsEjFEWRhRA7AbQD2AYgAOBWADdeM/kbQBLADICfiGiMmc9pmrbgRXyqxDkSiWxIpVK7iegpAEEAPoddZAEMM/OHTU1Ng7FY7KpbLa4S6e7u9i8tLR0A0A/gdrfBV/AbEb0hy/L7bhJynEgwGOxk5hMA7nbqa5NpZj6o6/qoEyfbiSiKIoQQLwN4xYmfS5iI3pZlud/u3bElKBwON2Wz2c8AtFUkzzljfr//iaGhoXQ5w7KJhMPh27LZ7AiA7Z5Ic85Fn88XGh4e/qOUUclEVFVtZOZzRHSvt9occ9Hv9z9c6s5IxRoURREAPl0HSQDA9sXFxdPXNBWkaCJCiGMAdlZFljt2CSFeLdZYcGgFg8E2Zv4KJRJ1Q19fHzZu3FjWbnJyElNTU4WaTABtmqZ9u7Jh1a2KRCK+dDo9AI+TAICuri40NjaWtVtYWCiWiATgpKIo9589e9ZY2bCMdDq9H8B9LrXWgh1CiN6VlcsSiUQiPgAv1kySe146cuTIMu3Lhtb8/HwYwF21UjM+Po65ublV9dPT0+Vct46NjYUAfJmrWJYIM+/3QqBdBgcHceHCBVe+RLQPlkTyt6e7u9sP4LGK1dWOxyORyIbcRT4RwzAeAnDDmkhyR0M6nX4wd2EdWhVNCBsaGhAIBEraCFH0xeyWdgBfA5ZETNO8h8j97DwQCCAajVYuzQFEtDVXliyVd9RUhTfcmStYn8VNayCkIpg5r9k6aBs8DoJMJlPSxjCMku02uClXsCbyb6W9WslkMtizZ4+XXRYir9k6tP6sdlSvIaJkrmxNJFnAdl3DzPkfX7JUJtZGjnuY+btcOf8fkSQpzsxHyzn39PSgp6dnVX0VXnZlkSQpno+fK6RSqalNmzbNA5BLOdfX19taHNWAjCzL53MX+aGVSCSWmPmDtdHkHGY+Zd28W744EWIA/6+L1z0+n+9d6/WqyZWqqqcB7C7WwebNm9Hc3Fw2kGEYuHTpkhuNdhjSNO1Ra0Whf2g/gEcA1BfqIZlMIplc0ye1kc1mX1hZuWrzQdO0WSI6XhtNziGid0ZHR1fd6oJbPkKI1wB8X3VVzvlFCHG4UEPRBUhnZ+c2IjqP9bNqXJIkqWNkZGSyUGPRTThd1y8z8wEAXDVpzni2WBJAmW9+V65c+bGlpcUkol3e67IPM7+p6/rrpWzKbovqun6MiN7zTpZjPu7o6DhUzsjuIp1UVR0AcLAyTc4gok9SqVRvIpFYKmdr+3Py7OzsF62trbcAeKAidfb5yDCMvRMTE7aWkU523FnTtGeI6DlUeRpDRG+1t7fvXbnjXtLHTSBVVXsBnMT1Uw1ecZWInj9z5swJp46uN7JCodBW0zRj8O4j6e+maT4Zj8e/cePs9MhFnpmZmb+2bNlySpKkFgA73PZzjc99Pl+Xpmk/u+3Akw//qqo+DSAK57OARQCHNU2LosIXr2cnGEKhUItpmicBqDZdJpi5T9f1y17E9/ooBqmqug/AcRTfufyHiI7KshyNxWJZzwJ71ZEVRVFurqurO8zMB3F9zWMCOG2aZn88Hv/V65hVPRwTCoW2m6YZBQBmPqTr+g/VivUfdhuSqDP6V/EAAAAASUVORK5CYII=",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_PARKING,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_RESTROOM,
    image:
      "data:image/png;base64,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",
  },
  {
    name: IndoorMapIconName.VENUE_FACILITY_STEPS,
    image:
      "data:image/png;base64,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",
  },
];

export default indoorMapIcons;
