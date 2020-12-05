
import axios from "axios";
import { propertiesService } from "../properties/propertiesService";
import { addEntryModeIfNotExist } from "../util/EntryMode";

export class RoomParameters {
  async getParameters(roomSID){
    return await new Promise((resolve, reject) => {
      axios.get(propertiesService.PROTOCOL + propertiesService.RETICULUM_SERVER + "/service/room/room/"+roomSID).then(resp => {
        resolve(resp.data);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  customPermission(){
    return ["change_screen","show_spawn_and_move_media","share_screen"];
  }

  async applyPermissionAsync(permission){
    permission["show_spawn_and_move_media"] = true;//default value
    let roomConfig = await this.getParameters(permission.hub_id);
    this.applyConfig(permission.hub_id);//also update preferences
    if (roomConfig) {
      if (roomConfig.permission) {
        permission = {...permission,...roomConfig.permission};
      }
      if(permission["change_video"]){
        permission["pin_objects"] = true;
        permission["spawn_camera"] = true;
      }
    }

    return permission;
  }

  async applyConfig(roomSID) {
    window.APP.override = { preferences: {} };
    let roomConfig = await this.getParameters(roomSID);
    if (roomConfig) {
      if (roomConfig.preferences) {
        Object.keys(roomConfig.preferences).forEach(key => {
          window.APP.store.state.preferences[key] = roomConfig.preferences[key];
        })
      }
      if (roomConfig.preferencesOverride) {
        Object.keys(roomConfig.preferencesOverride).forEach(key => {
          window.APP.override.preferences[key] = roomConfig.preferencesOverride[key];
        })
      }
      if (roomConfig.entryMode) {
        addEntryModeIfNotExist(roomConfig.entryMode);
      }
    }
  }
}

export const roomParameters = new RoomParameters();