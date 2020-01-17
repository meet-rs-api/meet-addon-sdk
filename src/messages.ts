import { ConfigurationItem , HostInfo, ParticipantInfo, PrincipalInfo } from './context';

export enum MessageType {
    READY = 'meet-sdk-ready',
    INIT = 'meet-sync-init',
    DATA = 'meet-message-data',
    PARTICIPANTS = 'meet-message-participants',
    MEET_STATE = 'meet-state-changed',
    TOOLTIPS = 'meet-tooltip-reqest',
    ADDON_MODE = 'meet-addonmode-change',
    REPOSITION = 'meet-float-reposition',
    
    /**
     * Event message of this type is sent when meet participant user profile change.
     * e.g. Display name, color, theme? 
     */
    USER_PROFILE = 'meet-userprofile-changed'
}

export enum AddonMode {
    HIDDEN = 'hidden',
    MINI = 'mini',
    NORMAL = 'normal',
    FULLSCREEN = 'fullscreen'
}

export enum PredefinedColor {

    DARK_INDIGO = '#303F9F',

    DEEP_ORANGE = '#FF5722',

    DARK_GREEN = '#388E3C',

    DARK_YELLOW = '#FBC02D',

    DEEP_PURPLE = '#512DA8',

    DARK_PINK = '#C2185B',

    DARK_TEAL = '#00796B'
}

/**
 * Structure describing in privacy protecting way
 * addon user who has joing to a meeting session
 *
 * @export
 * @class ParticipantJoinInfo
 */
export class ParticipantJoinInfo extends ParticipantInfo {

    /**
     * SignalR hub context user identifier.
     * Needed for sending messages to this specific user.
     *
     * @type {string}
     * @memberof ParticipantJoinInfo
     */
    public userIdentifier: string;
}

/**
 * Structure representing the data of the 
 * addon user who had just left the meeting session.
 *
 * @export
 * @class ParticipantLeaveInfo
 */
export class ParticipantLeaveInfo {
    
    /**
     * Identifier of the addon to which this participant leaving
     * information is created for.
     *
     * @type {string}
     * @memberof ParticipantLeaveInfo
     */
    public addonIdentifier: string;

    /**
     * Unique has of a meeting session for a given addon session.
     *
     * @type {string}
     * @memberof ParticipantLeaveInfo
     */
    public sessionId: string;

    /**
     * Unique has of a user identifier he has in a given addon session.
     *
     * @type {string}
     * @memberof ParticipantLeaveInfo
     */
    public sessionUserId: string;

    /**
     *
     * Display name of the session user (if any).
     *
     * Display name can be undefined if user choose in 
     * user privacy settings to not share it with addons.
     * 
     * @type {string}
     * @memberof ParticipantLeaveInfo
     */
    public displayName: string;
}

/**
 * List of states in which meeting can be 
 * during the lifetime of the meeting in which 
 * addon is loaded.
 *
 * @export
 * @enum {number}
 */
export enum PredefinedMeetingState {
    
    MEETING_DRAFT = 'MeetingDraft',
    MEETING_CREATED = 'MeetingCreated',
    MEETING_CANCELED = 'MeetingCanceled',
    MEETING_ARCHIVED = 'MeetingArchived',

    SCHEDULING_TIME = 'SchedulingTime',
    SCHEDULING_FAILED = 'SchedulingFailed',
    SCHEDULING_COMPLETED = 'SchedulingCompleted',

    MEETING_STARTED = 'MeetingStarted',
    MEETING_FAILED = 'MeetingFailed',
    MEETING_STOPPED = 'MeetingStopped',
    MEETING_COMPLETED = 'MeetingCompleted',

    FEEDBACK_COLLECTING = 'FeedbackCollecting',
    FEEDBACK_FAILED = 'FeedbackFailed',
    FEEDBACK_COMPLETED = 'FeedbackCompleted',

    BILLABLE_STARTED = 'BillableStarted',
    BILLABLE_STOPPED = 'BillableStopped'
}

export interface Dictionary {
    [key: string]: string;
}

/**
 * SDK addon message sent and received from other addons and/or host
 *
 * @export
 * @class AddonMessage
 */
export class AddonMessage {

    /**
     * Type of message being sent
     * 
     * @type {string}
     * @memberof AddonMessage
     */
    public type: string;
    
    /**
     * Event payload conatining the data which message receiver will know how to interpret
     * for a given message type.
     *
     * @type {string}
     * @memberof AddonMessage
     */
    public payload?: string;
}

/**
 * A message sent from host to addon 
 * requesting from addong to perform intialization
 * with given parameters.
 *
 * @export
 * @class InitMessage
 * @extends {AddonMessage}
 */
export class InitMessage extends AddonMessage {

    /**
     * Host runtime context defining in privacy protecting way 
     * meeting attributes which addon uses to operateestablishe its own session.
     *
     * @type {Context}
     * @memberof InitMessage
     */
    public principal: PrincipalInfo;

    /**
     * Information about the addon host needed for implementing 
     * iframe POST messaging between addon and host
     *
     * @type {HostInfo}
     * @memberof InitMessage
     */
    public host: HostInfo;

    /**
     * Gets or sets a collection of zero or more addon runtime settings 
     * which addon author defined to be passed to addon.
     * @type {AddonSettings}
     * @memberof InitMessage
     */
    public settings: Dictionary;

    /**
     * A set of configuration properties which are to be 
     * defined per meeting during the meeting creation 
     * and define the 
     * 
     * @type {ConfigurationValue[]}
     * @memberof InitMessage
     */
    public configuration: ConfigurationItem[];

    /**
     * Zero or more participants who are online in the moment of
     * addon initialziation defined with addon specific identifiers.
     *
     * @type {ParticipantInfo[]}
     * @memberof InitMessage
     */
    public participants: ParticipantInfo[];

    /**
     * Gets ths info about the mode in which addon is 
     * requested to be inialized which addon should use 
     * to configure its UI 
     *
     * @type {AddonMode}
     * @memberof InitMessage
     */
    public mode: AddonMode = AddonMode.NORMAL;

    /**
     * Gets or sets the information about the meeting state in the moment
     * of addon initialization.
     *
     * @type {PredefinedMeetingState}
     * @memberof InitMessage
     */
    public state: PredefinedMeetingState;

       /**
     * Creates an instance of InitMessage.
     * @memberof InitMessage
     */
    constructor() {
        super();
        this.type = MessageType.INIT;
    }
}

/**
 * A message sent from addont o a host when
 * initialization had completed and addon is 
 * ready for performing its functionality
 *
 * @export
 * @class ReadyMessage
 * @extends {AddonMessage}
 */
export class ReadyMessage extends AddonMessage {

    /**
     * Creates an instance of ReadyMessage.
     * @memberof ReadyMessage
     */
    constructor() {
        super();
        
        this.type = MessageType.READY;
    }
}
