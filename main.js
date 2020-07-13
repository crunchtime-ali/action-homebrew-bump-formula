import { exec as _exec } from '@actions/exec'
import { setFailed } from '@actions/core'
import { join } from 'path'

async function main() {
    try {
        process.env.HOMEBREW_NO_ENV_FILTERING = "1"
        process.env.HOMEBREW_NO_AUTO_UPDATE = "1"
        process.env.HOMEBREW_NO_ANALYTICS = "1"
        process.env.HOMEBREW_COLOR = "1"

        await _exec("brew", ["update-reset"])
        await _exec("brew", ["tap", "homebrew/livecheck"])
        await _exec("brew", ["ruby", join(__dirname, "main.rb")])
    } catch (error) {
        setFailed(error.message)
    }
}

main()
