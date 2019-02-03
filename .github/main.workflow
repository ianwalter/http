workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "ianwalter/puppeteer"
  runs = "yarn"
}

action "Lint" {
  uses = "ianwalter/puppeteer"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "ianwalter/puppeteer"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
