import React, { PropTypes } from 'react'
import { If, Else, Unless } from '../components/Utils'
import Loading from '../components/Loading'
import Image from '../components/Image'
import ChaingearLink from '../components/ChaingearLink'
import SystemMetrics from '../components/SystemMetrics'
import SystemAbout from '../components/SystemAbout'
import SystemLinks from '../components/SystemLinks'
import SystemLink from '../components/SystemLink'
import SpecsTable from '../components/SpecsTable'
import CrowdsaleIsActive from '../components/CrowdsaleIsActive'
import StarredByContainer from '../containers/StarredByContainer'
import KeenChart from '../components/KeenChart'
import StarButton from '../components/StarButton'
import helpers from '../helpers'
import { Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton, Grid, Cell, FABButton, Icon } from 'react-mdl'
import get from 'oget'
import Blaze from 'meteor/gadicc:blaze-react-component'

const SystemPage = props => {
// variables
const {system, system: {metrics, links, _id}} = props,
	  {loaded, mainLinks, isProject, existLinksWith, dependentsExist, dependents, anyCards} = props,
	  {linksWithTag} = helpers,
	  githubLink =  `https://github.com/cyberFund/chaingear/blob/gh-pages/sources/${_id}/${_id}.toml`

return loaded ? (
    <section id="SystemPage" className="text-center" itemScope itemType="http://schema.org/Product">

		<Unless condition={system.descriptions.page_state == 'ready'} component='p'>
			This page is not ready yet. Follow <a target="_blank" href={githubLink}>fan zone</a> to help us improve it faster!
		</Unless>

		<SystemAbout system={system} />
		<StarredByContainer system={system} />
		<CrowdsaleIsActive system={system} />

		<Grid>
			{mainLinks.map(
				link => <Cell key={link.name} col={3} tablet={4} phone={4}>
							<ChaingearLink link={link} />
						</Cell>
			)}
		</Grid>

		<Unless condition={isProject}>
			<SystemMetrics system={system} />
			<Blaze template="slowchart" system={_id} style="width: 100%" />
		</Unless>

		<If condition={existLinksWith(links, 'News')} component={Grid}>
		    <Cell col={12}> <h3>News</h3> </Cell>
			{linksWithTag(links, 'News').map(
					link => <ChaingearLink link={link} key={link.name} card />
			)}
		</If>

		{/* TABS / SYSTEMLINKS */}
		<SystemLinks links={linksWithTag(links, 'Apps')} systemId={_id} />
		<If condition={dependentsExist} component={Grid}>
			<Cell col={12}> <h3>Internal Economy</h3> </Cell>
			{dependents.map(
				system =>  	<Cell col={3} tablet={4} phone={4} key={system._id}>
								<SystemLink system={system} card />
							</Cell>
			)}
		</If>
		<Grid>
			<If condition={existLinksWith(links, 'Science')}>
				<Cell col={6} tablet={8} phone={4}>
			    	<h3>Scientific Roots</h3>
						{linksWithTag(links, 'Science').map(
							link => <p className="text-left" key={link.name}>
										<ChaingearLink link={link} />
									</p>
						)}
				</Cell>
			</If>
			<If condition={existLinksWith(links, 'Code')}>
				<Cell col={6} tablet={8} phone={4}>
					<h3>Developers Dimension</h3>
					{linksWithTag(links, 'Code').map(
						link => <p className="text-left" key={link.name}>
									<ChaingearLink link={link} />
								</p>
					)}
				</Cell>
			</If>
		</Grid>

		<SpecsTable system={system} />

		<Grid>
			<Cell col={12}>
				<p>You can <a target="_blank" href={githubLink}> improve {_id}'s page</a> on Github.</p>
			</Cell>
		</Grid>
		<Grid>
			<Cell col={12}>
				<KeenChart id="meow" value={_id} />
			</Cell>
		</Grid>

		{/* FLOATING BUTTON */}
		<StarButton systemId={_id} />

    </section>
) : <Loading />
}

SystemPage.propTypes = {
	system: PropTypes.object.isRequired,
	mainLinks: PropTypes.array.isRequired,
	dependentsExist: PropTypes.number.isRequired,
	dependents: PropTypes.array.isRequired,
	existLinksWith: PropTypes.func.isRequired,
	anyCards: PropTypes.func.isRequired
}

export default SystemPage