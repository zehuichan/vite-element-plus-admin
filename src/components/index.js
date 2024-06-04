import Renderer from './Renderer'
import AppProvider from './AppProvider'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import SvgIcon from './SvgIcon'
import Segmented from './Segmented'
import { Form, ApiSelect } from './Form'
import Search from './Search'
import { Table } from './Table'
import Pagination from './Pagination'
import { PageWrapper, PageFooter } from './Page'
import { Dropdown, DropdownItem } from './Dropdown'

const components = [
  Renderer,
  AppProvider,
  Search,
  Form,
  Fullcontent,
  ApiSelect,
  Icon,
  SvgIcon,
  Segmented,
  Table,
  Pagination,
  PageWrapper,
  PageFooter,
  Dropdown,
  DropdownItem
]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
