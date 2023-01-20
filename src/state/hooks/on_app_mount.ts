import {useEffect} from 'react'
import {setAsyncProcess} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {Dispatcher} from '@intf/State'

type Args = {
   dispatcher: Dispatcher
}

// Hook: when app mounts
function onAppMountHook({dispatcher}: Args) {

   useEffect(() => {
      // Get template details upon mount
      dispatcher(setAsyncProcess(AsyncProcesses.Pull, 'triggered'))
   }, [])
}

export default onAppMountHook
