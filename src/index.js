import Test from "./Components/Test"
import Container from "./Components/Container"
import Loading from "./Components/Loading"
import LogoIcon from "./Components/LogoIcon"
import CountTo from "./Components/CountTo"
import VueECharts from "./Components/VueECharts"

export default function (Vue) {
  Vue.use(Test)
  Vue.use(Container)
  Vue.use(Loading)
  Vue.use(LogoIcon)
  Vue.use(CountTo)
  Vue.use(VueECharts)
}
