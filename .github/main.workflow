workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "docker://buildkite/puppeteer"
  runs = "yarn"
}

action "Lint" {
  uses = "docker://buildkite/puppeteer"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "docker://buildkite/puppeteer"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
