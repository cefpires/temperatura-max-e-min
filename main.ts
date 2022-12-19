let Tmax = 0
let Tmin = 0
input.onButtonPressed(Button.A, function () {
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    basic.showString("T max")
    basic.showNumber(Tmax)
})
input.onButtonPressed(Button.AB, function () {
    Tmin = input.temperature()
    Tmax = input.temperature()
    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "Temp",
    "Time",
    "MaxMin"
    )
})
input.onButtonPressed(Button.B, function () {
    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    basic.showString("T min")
    basic.showNumber(Tmin)
})
basic.forever(function () {
    if (input.logoIsPressed()) {
        basic.showNumber(input.temperature())
    }
    if (input.temperature() > Tmax) {
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        Tmax = input.temperature()
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
        datalogger.log(datalogger.createCV("Temp", Tmax))
    }
    if (input.temperature() < Tmin) {
        music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
        Tmin = input.temperature()
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
        datalogger.log(datalogger.createCV("Temp", Tmin))
    }
})
