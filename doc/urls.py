from django.contrib import admin
from django.urls import path, include
from doc import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload_zip_file, name='zip'),
    path('update/<int:id>/<str:language>/', views.update_doc, name='update'),
    path('delete/<int:id>/<str:language>/', views.delete_doc, name='delete'),

    path('get_task_list/', views.get_task_list, name='get_task_list'),

    path('slogan_key_synonymous_words/<str:language>/', views.slogan_key_synonymous_words,
         name='slogan_key_synonymous_words'),
    # ---------------- temporary url , will be removed after level detection bug is fixed ----------------#
    path('detect_level/<int:id>/', views.detect_level, name='detect_level'),
    path('static_data_import_db/<int:id>/<str:language>/', views.static_data_import_db, name='static_data_import_db'),
    path('leadership_slogan_analysis/<int:id>/', views.leadership_slogan_analysis, name='leadership_slogan_analysis'),
    path('docs_clause_extractor/<int:id>/', views.docs_clause_extractor, name='docs_clause_extractor'),
    path('docs_actors_extractor/<int:id>/', views.docs_actors_extractor, name='docs_actors_extractor'),
    path('docs_lda_topic_extraction/<int:id>/', views.docs_lda_topic_extraction, name='docs_lda_topic_extraction'),
    path('template_panels_data_import_db/<int:id>/', views.template_panels_data_import_db,name='template_panels_data_import_db'),
    path('docs_general_actors_extractor/<int:id>/', views.docs_general_actors_extractor,name='docs_general_actors_extractor'),
    path('docs_general_definitions_extractor/<int:id>/', views.docs_general_definitions_extractor,name='docs_general_definitions_extractor'),
    path('operators_static_data_to_db/<int:id>/', views.operators_static_data_to_db,name='operators_static_data_to_db'),
    path('search_parameters_to_db/<int:id>/', views.search_parameters_to_db, name='search_parameters_to_db'),
    path('rahbari_search_parameters_to_db/<int:id>/', views.rahbari_search_parameters_to_db,name='rahbari_search_parameters_to_db'),
    path('create_judgments_table/<int:id>/', views.create_judgments_table, name='create_judgments_table'),
    path('create_standards_table/<int:id>/', views.create_standards_table, name='create_standards_table'),
    path('FindSubjectComplaint/<int:id>/', views.FindSubjectComplaint, name='FindSubjectComplaint'),
    path('docs_opertators_extractor/<int:id>/', views.docs_opertators_extractor, name='docs_opertators_extractor'),
    path('docs_regulators_extractor/<int:id>/', views.docs_regulators_extractor, name='docs_regulators_extractor'),
    path('collective_static_data_to_db/<int:id>/', views.collective_static_data_to_db,name='collective_static_data_to_db'),
    path('docs_collective_extractor/<int:id>/', views.docs_collective_extractor, name='docs_collective_extractor'),
    path('docs_complete_para_extractor/<int:id>/', views.docs_complete_para_extractor,name='docs_complete_para_extractor'),
    path('document_json_list/<int:id>/', views.document_json_list, name='document_json_list'),
    path('actors_static_data_to_db/<int:id>/', views.actors_static_data_to_db, name='actors_static_data_to_db'),
    path('regulators_static_import_db/<int:id>/', views.regulators_static_import_db,name='regulators_static_import_db'),
    path('actors_time_series_extractor/<int:id>/', views.actors_time_series_extractor,name='actors_time_series_extractor'),
    path('rahbari_labels_time_series_extractor/<int:id>/', views.rahbari_labels_time_series_extractor,name='rahbari_labels_time_series_extractor'),
    path('actors_graph_extractor/<int:id>/', views.actors_graph_extractor, name='actors_graph_extractor'),
    path('actors_new_graph_extractor/<int:id>/', views.actors_new_graph_extractor, name='actors_new_graph_extractor'),
    path('create_CUBE_docs_general_actors_extractorubject_Statistics/<int:id>/', views.create_CUBE_Subject_Statistics,name='create_CUBE_Subject_Statistics'),
    path('create_CUBE_Subject/<int:id>/', views.create_CUBE_Subject, name='create_CUBE_Subject'),
    path('create_CUBE_CollectiveActor/<int:id>/', views.create_CUBE_CollectiveActor,name='create_CUBE_CollectiveActor'),
    path('create_CUBE_RegularityLifeCycle/<int:id>/', views.create_CUBE_RegularityLifeCycle,name='create_CUBE_RegularityLifeCycle'),
    path('create_CUBE_MandatoryRegulations/<int:id>/', views.create_CUBE_MandatoryRegulations,name='create_CUBE_MandatoryRegulations'),
    path('create_CUBE_Votes/<int:id>/', views.create_CUBE_Votes, name='create_CUBE_Votes'),
    path('create_CUBE_Template/<int:id>/<str:panel_name>/', views.create_CUBE_Template, name='create_CUBE_Template'),
    path('create_CUBE_Principles/<int:id>/', views.create_CUBE_Principle, name='create_CUBE_Principle'),
    path('create_CUBE_MaxMinEffectActorsInArea/<int:id>/', views.create_CUBE_MaxMinEffectActorsInArea,name='create_CUBE_MaxMinEffectActorsInArea'),
    path('create_CUBE_BusinessAdvisor/<int:id>/', views.create_CUBE_BusinessAdvisor,name='create_CUBE_BusinessAdvisor'),
    path('GetGraphNodesEdges/<int:country_id>/<int:measure_id>/<str:minimum_weight>/', views.GetGraphNodesEdges,name='GetGraphNodesEdges'),
    path('GetRahbariSearchParameters/<int:country_id>/', views.GetRahbariSearchParameters,
         name='GetRahbariSearchParameters'),
    path('GetParagraphSubjectContent/<int:paragraph_id>/<int:version_id>/', views.GetParagraphSubjectContent,
             name='GetParagraphSubjectContent'),
    path('GetUnknownDocuments/', views.GetUnknownDocuments, name='GetUnknownDocuments'),
    path('DownloadUnknownDocuments/', views.DownloadUnknownDocuments, name='DownloadUnknownDocuments'),
    path('information/', views.information, name='information'),
    path('following_document_comments/', views.following_document_comments, name='following_document_comments'),
    path('notes/', views.notes, name='notes'),
    path('graph2/', views.graph2, name='graph2'),
    path('es_search/', views.es_search, name='es_search'),
    path('dendrogram/<int:country_id>/<str:ngram_type>/', views.dendrogram, name='dendrogram'),
    path('decision_tree/<int:country_id>/<int:clustering_algorithm_id>/', views.decision_tree, name='decision_tree'),
    path('rahbari_search/', views.rahbari_search, name='rahbari_search'),
    path('rahbari_paraghraph/', views.rahbari_paraghraph, name='rahbari_paraghraph'),
    path('rahbari_subject/', views.rahbari_subject, name='rahbari_subject'),
    path('rahbari_organization/', views.rahbari_organization, name='rahbari_organization'),
    path('rahbari_problem_system/', views.rahbari_problem_system, name='rahbari_problem_system'),
    path('rahbari_topic/', views.rahbari_topic, name='rahbari_topic'),
    path('rahbari_labels/', views.rahbari_labels, name='rahbari_labels'),
    path('leadership_slogan/', views.leadership_slogan, name='leadership_slogan'),
    path('document_profile/', views.document_profile, name='document_profile'),
    path('comparison/', views.comparison, name='comparison'),
    path('GetRahbariDocumentById/<int:country_id>/<int:document_id>/',views.GetRahbariDocumentById, name='GetRahbariDocumentById'),
    path('rahbari_document_get_full_profile_analysis/<int:country_id>/<int:document_id>/',views.rahbari_document_get_full_profile_analysis, name='rahbari_document_get_full_profile_analysis'),
    path("signup/", views.signup, name="signup"),
    path("login/", views.login, name="login"),
    path("admin/", views.Admin, name="admin"),
    path("manage_users_tab/", views.ManageUsersTab, name="manage_users_tab"),
    path("manage_users/", views.ManageUsers, name="manage_users"),
    path("get_permissions_excel/", views.GetPermissionsExcel, name="get_permissions_excel"),
    path("get_allowed_panels/", views.GetAllowedPanels, name="get_allowed_panels"),
    path("get_allowed_panels/<str:username>/", views.GetPermissions, name="get_allowed_panels_by_username"),
    path("get_all_panels/", views.GetAllPanels, name="get_allowed_panels_by_username"),
    path("create_panels/", views.CreatePanel, name="create_panels"),
    path("create_or_delete_user_panels/<str:panel_name>/<str:username>/", views.CreateOrDeleteUserPanel,name="create_or_delete_user_panels"),
    path("admin_waiting_user/", views.getRegisteredUser, name="admin_waiting_user"),
    path("admin_confirm_waiting_user/", views.getRegisteredUser2, name="admin_confirm_waiting_user"),
    path("admin_accepted_user/", views.seeAcceptedUser, name="admin_accepted_user"),
    path("super_admin_user_log/", views.showUserLogs, name="super_admin_user_log"),
    path("deploy_server_log/", views.showDeployLogs, name="deploy_server_log"),
    path("admin_user_recommendation/", views.get_user_recommendation, name="admin_user_recommendation"),
    path("admin_user_report_bug/", views.get_user_report_bug, name="admin_user_report_bug"),
    path("admin_accept_user_comments/", views.seeAllComment, name="admin_accept_user_comments"),
    path("admin_confirm_user_comments/", views.seeAllComment2, name="admin_confirm_user_comments"),
    path("admin_upload/", views.admin_upload, name="admin_upload"),
    path('recommendation/', views.recommendation, name='recommendation'),
    path('report_bug/', views.report_bug, name='report_bug'),
    path("approvals_adaptation/", views.approvals_adaptation, name='approvals_adaptation'),
    path("delete_user/<int:user_id>/", views.DeleteUser, name='DeleteUser'),
    path('GetBM25Similarity/<int:document_id>/', views.GetBM25Similarity, name='GetBM25Similarity'),

    # urls inside main pages
    path('GetDocumentById/<int:id>/', views.GetDocumentById, name='GetDocumentById'),
    path('GetDocumentsByCountryId_Modal/<int:country_id>/<int:start_index>/<int:end_index>/',views.GetDocumentsByCountryId_Modal, name='GetDocumentsByCountryId_Modal'),
    path('GetCountryById/<int:id>/', views.GetCountryById, name='GetCountryById'),
    path('GetTFIDFByDocumentId/<int:document_id>/', views.GetTFIDFByDocumentId, name='GetTFIDFByDocumentId'),
    path('GetTFIDFByDocumentId/<int:document_id>/', views.GetTFIDFByDocumentId, name='GetTFIDFByDocumentId'),
    path('GetPersianDefinitionByDocumentId/<int:document_id>/', views.GetPersianDefinitionByDocumentId,name='GetPersianDefinitionByDocumentId'),
    path('GetNGramByDocumentId/<int:document_id>/<int:gram>/', views.GetNGramByDocumentId, name='GetNGramByDocumentId'),
    path('GetReferencesByDocumentId/<int:document_id>/<int:type>/', views.GetReferencesByDocumentId,name='GetReferencesByDocumentId'),
    path('GetSubjectByDocumentId/<int:document_id>/<int:measure_id>/', views.GetSubjectByDocumentId,name='GetSubjectByDocumentId'),
    path('GetGraphSimilarityMeasureByCountry/<int:country_id>/', views.GetGraphSimilarityMeasureByCountry,name='GetGraphSimilarityMeasureByCountry'),
    path('GetGraphDistribution/<int:country_id>/<int:measure_id>/', views.GetGraphDistribution,name='GetGraphDistribution'),
    path('GetSubjectsByCountryId/<int:country_id>/', views.GetSubjectsByCountryId, name='GetSubjectsByCountryId'),
    path('GetCommonWords2Doc/<int:document1_id>/<int:document2_id>/', views.GetCommonWords2Doc,name='GetCommonWords2Doc'),
    path('GetReferences2Doc/<int:document1_id>/<int:document2_id>/', views.GetReferences2Doc, name='GetReferences2Doc'),
    path('GetTypeByCountryId/<int:country_id>/', views.GetTypeByCountryId, name='GetTypeByCountryId'),
    path('GetGraphEdgesForDocument/<int:measure_id>/<int:document_id>/', views.GetGraphEdgesForDocument,name='GetGraphEdgesForDocument'),
    path('SearchDocument_ES/<int:country_id>/<int:level_id>/<int:subject_id>/<int:type_id>/<int:approval_reference_id>/<int:from_year>/<int:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<int:revoked_type_id>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',views.SearchDocument_ES, name='SearchDocument_ES'),
    path('SearchDocuments_Column_ES/<int:country_id>/<str:level_name>/<str:subject_name>/<str:type_name>/<str:approval_reference_name>/<str:from_year>/<str:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<str:revoked_type_name>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',views.SearchDocuments_Column_ES, name='SearchDocuments_Column_ES'),
    path('Get_Documents_RefGraph_ES/<int:country_id>/<int:level_id>/<int:subject_id>/<int:type_id>/<int:approval_reference_id>/<int:from_year>/<int:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<int:revoked_type_id>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',views.Get_Documents_RefGraph_ES, name='Get_Documents_RefGraph_ES'),
    path('SearchDocument_ES2/<int:country_id>/<int:level_id>/<int:subject_id>/<int:type_id>/<int:approval_reference_id>/<int:from_year>/<int:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<int:revoked_type_id>/<str:place>/<str:text>/<str:search_type>/',views.SearchDocument_ES2, name='SearchDocument_ES2'),
    path('GetActorsChartData_ES_2/<int:country_id>/<int:level_id>/<int:subject_id>/<int:type_id>/<int:approval_reference_id>/<int:from_year>/<int:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<int:revoked_type_id>/<str:place>/<str:text>/<str:search_type>/',views.GetActorsChartData_ES_2, name='GetActorsChartData_ES_2'),
    path('GetSearchDetails_ES/<int:document_id>/<str:search_type>/<str:text>/', views.GetSearchDetails_ES,name='GetSearchDetails_ES'),
    path('GetSearchDetails_ES_2/<int:document_id>/<str:search_type>/<str:text>/', views.GetSearchDetails_ES_2,name='GetSearchDetails_ES_2'),
    path('SearchRahbari_ES/<int:country_id>/<int:type_id>/<str:label_name>/<int:from_year>/<int:to_year>/<str:rahbari_type>/<str:document_ids>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/<int:page_size>/',views.SearchRahbari_ES, name='SearchRahbari_ES'),
    path('SearchRahbariRule_ES/<int:country_id>/<int:type_id>/<str:label_name>/<int:from_year>/<int:to_year>/<str:rahbari_type>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',views.SearchRahbariRule_ES, name='SearchRahbariRule_ES'),
    path('Search_Rahbari_Column_ES/<int:country_id>/<str:type_name>/<str:label_name_list>/<str:from_year>/<str:to_year>/<str:rahbari_type>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',views.Search_Rahbari_Column_ES, name='Search_Rahbari_Column_ES'),
    path('Search_Rahbari_Paragraph_Column_ES/<int:country_id>/<str:type_name>/<str:label_name_list>/<str:from_year>/<str:to_year>/<str:place>/<str:text>/<str:search_type>/<str:field_name>/<str:field_value>/<str:sentiment>/<int:curr_page>/<int:result_size>/',views.Search_Rahbari_Paragraph_Column_ES, name='Search_Rahbari_Paragraph_Column_ES'),
    path('Export_Rahbari_Paragraph_Column_ES/<int:country_id>/<str:type_name>/<str:label_name_list>/<str:from_year>/<str:to_year>/<str:place>/<str:text>/<str:search_type>/<str:field_name>/<str:field_value>/<str:sentiment>/<int:curr_page>/<int:result_size>/',views.Export_Rahbari_Paragraph_Column_ES, name='Export_Rahbari_Paragraph_Column_ES'),
    path('GetActorsList/', views.GetActorsList, name='GetActorsList'),
    path('GetActorsDict/', views.GetActorsDict, name='GetActorsDict'),
    path('GetDocActorParagraphs_Column_Modal/<int:document_id>/<str:actor_name>/<str:role_name>/',views.GetDocActorParagraphs_Column_Modal, name='GetDocActorParagraphs_Column_Modal'),
    path('follow/<str:follower_username>/<int:following_user_id>/', views.follow, name='follow'),
    path('unfollow/<str:follower_username>/<int:following_user_id>/', views.unfollow, name='unfollow'),
    path('GetFollowings/<str:follower_username>/', views.GetFollowings, name='GetFollowings'),
    path('GetUserComments/<int:user_id>/<int:hashtag_id>/', views.GetUserComments, name='GetUserComments'),
    path('GetAllUsers_Commented/<str:user_name>/<str:user_type>/', views.GetAllUsers_Commented,name='GetAllUsers_Commented'),
    path('UpdateNgramScore/<int:document_id>/<int:gram>/<str:gram_ids>/', views.UpdateNgramScore,name='UpdateNgramScore'),
    path('InsertNgram/<int:document_id>/<int:gram>/<str:texts>/', views.InsertNgram, name='InsertNgram'),
    path('DeleteNgram/<int:gram_id>/', views.DeleteNgram, name='DeleteNgram'),
    path('GetActorsPararaphsByDocumentId/<int:document_id>/', views.GetActorsPararaphsByDocumentId,name='GetActorsPararaphsByDocumentId'),
    path('GetDocumentContent/<int:document_id>/', views.GetDocumentContent, name='GetDocumentContent'),
    path('GetDocumentSubjectContent/<int:document_id>/<int:version_id>/', views.GetDocumentSubjectContent,name='GetDocumentSubjectContent'),
    path('SearchGeneralDocumentsDefinition/<int:country_id>/<str:mode>/<str:text>/',views.SearchGeneralDocumentsDefinition, name='SearchGeneralDocumentsDefinition'),
    path('GetKeywordsGeneralDefinitionByDocumentId/<int:document_id>/<str:word>/',views.GetKeywordsGeneralDefinitionByDocumentId, name='GetKeywordsGeneralDefinitionByDocumentId'),
    path('SaveUser/<str:firstname>/<str:lastname>/<str:nationalcode>/<str:email>/<str:phonenumber>/<int:role>/<str:username>/<str:password>/<str:ip>/<str:expertise>/',views.SaveUser, name='SaveUser'),
    path('CheckUserLogin/<str:username>/<str:password>/<str:ip>/', views.CheckUserLogin, name='CheckUserLogin'),
    path('changeUserState/<int:user_id>/<str:state>/', views.changeUserState, name='changeUserState'),
    path('changeCommentState/<int:comment_id>/<str:state>/', views.changeCommentState, name='changeCommentState'),
    path('GetDocumentCommentVoters/<int:document_comment_id>/<str:agreed>/', views.GetDocumentCommentVoters,name='GetDocumentCommentVoters'),
    path('GetUserRole/', views.GetUserRole, name='GetUserRole'),
    path('GetUserExpertise/', views.GetUserExpertise, name='GetUserExpertise'),
    path('UserLogSaved/<str:username>/<str:url>/<str:ip>/', views.UserLogSaved, name='UserLogSaved'),
    path('UserDeployLogSaved/<str:username>/<str:detail>/', views.UserDeployLogSaved, name='UserDeployLogSaved'),
    path('Recommendations/<str:first_name>/<str:last_name>/<str:email>/<str:recommendation_text>/<int:rating_value>/',
         views.Recommendations, name='Recommendations'),
    path('CreateDocumentComment/<int:document>/<str:comment>/<str:username>/<str:comment_show_info>/<str:time>/',
         views.CreateDocumentComment, name='CreateDocumentComment'),
    path('CreateHashTagForDocumentComment/<int:comment_id>/<str:hash_tag>/', views.CreateHashTagForDocumentComment,
         name='CreateHashTagForDocumentComment'),
    path('GetAllUserCommentHashtags/', views.GetAllUserCommentHashtags, name='GetAllUserCommentHashtags'),
    path('CreateReportBug/<str:username>/<str:report_bug_text>/<str:panel_id>/<str:branch_id>/', views.CreateReportBug,
         name='CreateReportBug'),
    path('ChangeReportBugCheckStatus/<int:report_bug_id>/', views.ChangeReportBugCheckStatus,
         name='ChangeReportBugCheckStatus'),
    path('GetReportBugByFilter/<str:panel_id>/<str:branch_id>/<str:status>/', views.GetReportBugByFilter,
         name='GetReportBugByFilter'),
    path('GetDocumentComments/<int:document>/<str:username>/', views.GetDocumentComments, name='GetDocumentComments'),
    path('CreateDocumentNote/<int:document>/<str:note>/<str:username>/<str:time>/<str:label>/',
         views.CreateDocumentNote, name='CreateDocumentNote'),
    path('CreateHashTagForNote/<int:note_id>/<str:hash_tag>/', views.CreateHashTagForNote, name='CreateHashTagForNote'),
    path('GetDocumentNotes/<int:document>/<str:username>/', views.GetDocumentNotes, name='GetDocumentNotes'),
    path('ToggleNoteStar/<int:note_id>/', views.ToggleNoteStar, name='ToggleNoteStar'),

    path('changeVoteState/<str:username>/<int:document_comment>/<str:state>/', views.changeVoteState,
         name='changeVoteState'),
    path('UserLogSaved/<str:username>/<str:url>/<str:sub_url>/<str:ip>/', views.UserLogSaved, name='UserLogSaved'),

    path('getUserLogs/<int:user_id>/<str:time_start>/<str:time_end>/', views.getUserLogs, name='getUserLogs'),
    path('getChartLogs/<int:user_id>/<str:time_start>/<str:time_end>/', views.getChartLogs, name='getChartLogs'),
    path('getTableUserLogs/<int:user_id>/<str:time_start>/<str:time_end>/', views.getTableUserLogs,
         name='getTableUserLogs'),
    path('getUserChartLogs/<int:user_id>/<str:time_start>/<str:time_end>/', views.getUserChartLogs,
         name='getUserChartLogs'),
    path('GetAllNotesInTimeRange/<str:username>/<str:time_start>/<str:time_end>/', views.GetAllNotesInTimeRange,
         name='GetAllNotesInTimeRange'),
    path('GetNotesInTimeRangeFilterLabelHashtag/<str:username>/<str:time_start>/<str:time_end>/<str:label>/<str:hashtag>/',
        views.GetNotesInTimeRangeFilterLabelHashtag, name='GetNotesInTimeRangeFilterLabelHashtag'),
    path('getUserDeployLogs/', views.getUserDeployLogs, name='getUserDeployLogs'),
    path('UploadFile/<str:country>/<str:language>/<str:tasks_list>/', views.UploadFile, name='UploadFile'),
    path('GetGeneralDefinition/<int:document_id>/', views.GetGeneralDefinition, name='GetGeneralDefinition'),
    path('GetGeneralDefinition2/<int:document_id>/', views.GetGeneralDefinition2, name='GetGeneralDefinition2'),
    path('GetColumnParagraphsByActorRoleName_Modal_es_2/<str:actor_name>/<str:role_name>/<int:curr_page>/<int:country_id>/<int:level_id>/<int:subject_id>/<int:type_id>/<int:approval_reference_id>/<int:from_year>/<int:to_year>/<int:from_advisory_opinion_count>/<int:from_interpretation_rules_count>/<int:revoked_type_id>/<str:place>/<str:text>/<str:search_type>/',
        views.GetColumnParagraphsByActorRoleName_Modal_es_2, name='GetColumnParagraphsByActorRoleName_Modal_es_2'),
    path('GetChartSloganAnalysis/<int:country_id>/<int:slogan_year>/', views.GetChartSloganAnalysis,
         name='GetChartSloganAnalysis'),
    path('GetInfoChartSloganAnalysis/<int:country_id>/<int:slogan_year>/', views.GetInfoChartSloganAnalysis,
         name='GetInfoChartSloganAnalysis'),
    path('GetDetailChartSloganAnalysis/<int:country_id>/<int:slogan_year>/<str:chart_type>/<str:column_name>/',
         views.GetDetailChartSloganAnalysis, name='GetDetailChartSloganAnalysis'),
    path('AI_predict_subject_LDA/<int:country_id>/<int:number_of_topic>/', views.GetDocumentsPredictSubjectLDA,
         name='GetDocumentsPredictSubjectLDA'),
    path("AI_topics/", views.AI_topics, name='AI_topics'),
    path("paragrraph_clustering/", views.paragrraph_clustering, name='paragrraph_clustering'),
    path("AIGetLDATopic/<int:country_id>/<int:number_of_topic>/<str:username>/", views.AIGetLDATopic,
         name='AIGetLDATopic'),
    path("AILDADocFromTopic/<int:topic_id>/", views.AILDADocFromTopic, name='AILDADocFromTopic'),
    path("AILDAWordCloudTopic/<int:topic_id>/", views.AILDAWordCloudTopic, name='AILDAWordCloudTopic'),
    path("AILDASubjectChartTopic/<int:topic_id>/", views.AILDASubjectChartTopic, name='AILDASubjectChartTopic'),
    path('GetLDAForDocByID/<int:document_id>/', views.GetLDAForDocByID, name='GetLDAForDocByID'),
    path('ShowMyUserProfile/', views.ShowMyUserProfile, name='ShowMyUserProfile'),
    path('GetMyUserProfile/', views.GetMyUserProfile, name='GetMyUserProfile'),
    path('SetMyUserProfile/', views.SetMyUserProfile, name='SetMyUserProfile'),
    path('ChangePassword/<str:old_password>/<str:new_password>/', views.ChangePassword, name='ChangePassword'),
    path('ShowUserProfile/', views.ShowUserProfile, name='ShowUserProfile'),
    path('GetUserProfile/<int:id>/', views.GetUserProfile, name='GetUserProfile'),
    path('account/self/', views.self, name='self'),
    path('get_pending_followers/', views.get_pending_followers, name='get_pending_followers'),
    path('accept_follower/<int:id>/', views.accept_follower, name='accept_follower'),
    path('reject_follower/<int:id>/', views.reject_follower, name='reject_follower'),
    path('GetUnknownDocuments/', views.GetUnknownDocuments, name='GetUnknownDocuments'),
    path('indictment_to_db/<int:id>/', views.indictment_to_db, name='indictment_to_db'),
    path('ingest_documents_to_index/<int:id>/<str:language>/', views.ingest_documents_to_index,
         name='ingest_documents_to_index'),
    path('ingest_document_actor_to_index/<int:id>/<str:language>/', views.ingest_document_actor_to_index,
         name='ingest_document_actor_to_index'),
    path('ingest_actor_supervisor_to_index/<int:id>/<str:language>/', views.ingest_actor_supervisor_to_index,
         name='ingest_actor_supervisor_to_index'),
    path('ingest_spatiotemporal_to_index/<int:id>/', views.ingest_spatiotemporal_to_index,
         name='ingest_spatiotemporal_to_index'),
    path('ingest_judgments_to_index/<int:id>/<str:language>/', views.ingest_judgments_to_index,
         name='ingest_judgments_to_index'),
    path('ingest_revoked_documents/<int:id>/<str:language>/', views.ingest_revoked_documents,
         name='ingest_revoked_documents'),
    path('ingest_paragraphs_to_index/<int:id>/<str:language>/<int:is_for_ref>/', views.ingest_paragraphs_to_index,
         name='ingest_paragraphs_to_index'),
    path('ingest_standard_documents_to_index/<int:id>/<str:language>/', views.ingest_standard_documents_to_index,
         name='ingest_standard_documents_to_index'),
    path('ingest_terminology_to_index/<int:id>/<str:language>/', views.ingest_terminology_to_index,
         name='ingest_terminology_to_index'),
    path('ingest_full_profile_analysis_to_elastic/<int:id>/', views.ingest_full_profile_analysis_to_elastic,
         name='ingest_full_profile_analysis_to_elastic'),
    path('ingest_rahbari_to_index/<int:id>/', views.ingest_rahbari_to_index,
         name='ingest_rahbari_to_index'),
    path('ingest_rahbari_to_sim_index/<int:id>/', views.ingest_rahbari_to_sim_index,
         name='ingest_rahbari_to_sim_index'),
    path('ingest_document_collective_members_to_index/<int:id>/', views.ingest_document_collective_members_to_index,
         name='ingest_document_collective_members_to_index'),
    path('ingest_clustering_paragraphs_to_index/<int:id>/<str:language>/', views.ingest_clustering_paragraphs_to_index,
         name='ingest_clustering_paragraphs_to_index'),
    path('GetSearchDetails_ES_Rahbari/<int:document_id>/<str:search_type>/<str:text>/',
         views.GetSearchDetails_ES_Rahbari, name='GetSearchDetails_ES_Rahbari'),
    path('GetSearchDetails_ES_Rahbari_2/<int:document_id>/<str:search_type>/<str:text>/<int:isRule>/',
         views.GetSearchDetails_ES_Rahbari_2, name='GetSearchDetails_ES_Rahbari_2'),
    path('GetRahbariTypeDetails_ES/<int:document_id>/<int:rahbari_type_id>/',
         views.GetRahbariTypeDetails_ES, name='GetRahbariTypeDetails_ES'),
    path(
        'rahbari_get_full_profile_analysis/<int:country_id>/<int:type_id>/<str:label_name>/<int:from_year>/<int:to_year>/<str:rahbari_type>/<str:place>/<str:text>/<str:search_type>/<int:curr_page>/',
        views.rahbari_get_full_profile_analysis, name='rahbari_get_full_profile_analysis'),
    path('rahbari_similarity_calculation/<int:id>/', views.rahbari_similarity_calculation,
         name='rahbari_similarity_calculation'),
    path('ingest_standard_documents_to_sim_index/<int:id>/<str:language>/',
         views.ingest_standard_documents_to_sim_index, name='ingest_standard_documents_to_sim_index'),
    path('books_similarity_calculation/<int:id>/', views.books_similarity_calculation,
         name='books_similarity_calculation'),
    path('books_similarity_calculation_cube/<int:id>/', views.books_similarity_calculation_cube,
         name='books_similarity_calculation_cube'),
    path('paragraphs_similarity_calculation/<int:id>/', views.paragraphs_similarity_calculation,
         name='paragraphs_similarity_calculation'),
    path('rahbari_paragraphs_similarity_calculation/<int:id>/', views.rahbari_paragraphs_similarity_calculation,
         name='rahbari_paragraphs_similarity_calculation'),
    path('update_file_name_extention/<int:id>/', views.update_file_name_extention, name='update_file_name_extention'),
    path('ARIMA_Prediction_TO_DB/<int:id>/', views.ARIMA_Prediction_TO_DB, name='ARIMA_Prediction_TO_DB'),

    path('revoked_types_to_db/<int:id>/', views.revoked_types_to_db, name='revoked_types_to_db'),
    path('subject_area_keywords_to_db/<int:id>/', views.subject_area_keywords_to_db,
         name='subject_area_keywords_to_db'),
    path('rahbari_update_fields_from_file/<int:id>/', views.rahbari_update_fields_from_file,
         name='rahbari_update_fields_from_file'),
    path('clustering_algorithms_to_db/<int:id>/', views.clustering_algorithms_to_db,
         name='clustering_algorithms_to_db'),
    path('rahbari_labels_to_db/<int:id>/', views.rahbari_labels_to_db,
         name='rahbari_labels_to_db'),
    path('GetDoticSimDocument/<int:document_id>/', views.GetDoticSimDocument, name='GetDoticSimDocument'),
    path('GetDoticSimDocument_ByTitle/<str:document_name>/', views.GetDoticSimDocument_ByTitle,
         name='GetDoticSimDocument_ByTitle'),
    path('GetDoticSimDocument_ByLabels/<int:document_id>/', views.GetDoticSimDocument_ByLabels,
         name='GetDoticSimDocument_ByLabels'),
    path('GetDetail_DoticSimDocument_ByLabels/<int:src_document_id>/<int:dest_document_id>/',
         views.GetDetail_DoticSimDocument_ByLabels, name='GetDetail_DoticSimDocument_ByLabels'),
    path('GetParaSimilarity/<int:doc1_id>/<int:doc2_id>/', views.GetParaSimilarity, name='GetParaSimilarity'),
    path('get_rahbari_document_actor/<int:document_id>/', views.get_rahbari_document_actor,
         name='get_rahbari_document_actor'),
    path('trial_law_import/<int:id>/', views.trial_law_import, name='trial_law_import'),
    path("ManualClustering/", views.ManualClustering, name='ManualClustering'),
    path("BoostingSearchParagraph_ES/<int:country_id>/<int:curr_page>/<int:result_size>/",
         views.BoostingSearchParagraph_ES, name='BoostingSearchParagraph_ES'),
    path(
        "rahbari_document_classification_chart_column/<int:document_id>/<str:subject>/<int:curr_page>/<int:result_size>/",
        views.rahbari_document_classification_chart_column, name='rahbari_document_classification_chart_column'),
    path(
        "rahbari_document_name_chart_column/<int:document_id>/<str:name>/<str:field_name>/<int:curr_page>/<int:result_size>/",
        views.rahbari_document_name_chart_column, name='rahbari_document_name_chart_column'),

    path(
        "rahbari_document_actor_chart_column/<int:document_id>/<str:name>/<int:curr_page>/<int:result_size>/",
        views.rahbari_document_actor_chart_column, name='rahbari_document_actor_chart_column'),

    path(
        "export_rahbari_document_chart_column/<int:document_id>/<str:text>/<str:keyword>/<int:curr_page>/<int:result_size>/",
        views.export_rahbari_document_chart_column, name='export_rahbari_document_chart_column'),

    path(
        "BoostingSearchKnowledgeGraph_ES/<int:country_id>/<str:field_name>/<str:field_value>/<str:language>/<str:search_type>/<int:curr_page>/<int:result_size>/",
        views.BoostingSearchKnowledgeGraph_ES, name='BoostingSearchKnowledgeGraph_ES'),

    path(
        "BoostingSearchParagraph_Column_ES/<int:country_id>/<str:field_name>/<str:field_value>/<int:curr_page>/<int:result_size>/",
        views.BoostingSearchParagraph_Column_ES, name='BoostingSearchParagraph_Column_ES'),

    # ----------- LDA heatmap -----------------
    path("AIGet_Topic_Centers_CahrtData/<int:country_id>/<int:number_of_topic>/", views.AIGet_Topic_Centers_CahrtData,
         name='AIGet_Topic_Centers_CahrtData'),
    path('GetLDAGraphData/<int:country_id>/<int:number_of_topic>/', views.GetLDAGraphData,
         name='GetLDAGraphData'),

    path('GetLDAKeywordGraphData/<int:country_id>/<int:number_of_topic>/', views.GetLDAKeywordGraphData,
         name='GetLDAKeywordGraphData'),

    path('save_lda_topic_label/<str:topic_id>/<str:username>/<str:label>/', views.save_lda_topic_label,
         name='save_lda_topic_label'),

    # -------------- Clustering ----------------
    path(
        'GetParagraph_Clusters/<int:country_id>/<str:algorithm_name>/<str:vector_type>/<int:cluster_count>/<str:ngram_type>/<str:username>/',
        views.GetParagraph_Clusters, name='GetParagraph_Clusters'),
    path(
        'Get_ClusterCenters_ChartData/<int:country_id>/<str:algorithm_name>/<str:vector_type>/<int:cluster_count>/<str:ngram_type>/',
        views.Get_ClusterCenters_ChartData, name='Get_ClusterCenters_ChartData'),
    path(
        'Get_ClusteringAlgorithm_DiscriminatWords_ChartData/<int:country_id>/<str:algorithm_name>/<str:vector_type>/<int:cluster_count>/<str:ngram_type>/',
        views.Get_ClusteringAlgorithm_DiscriminatWords_ChartData,
        name='Get_ClusteringAlgorithm_DiscriminatWords_ChartData'),

    path('Get_Clustering_Vocabulary/<int:country_id>/<str:vector_type>/<str:ngram_type>/',
         views.Get_Clustering_Vocabulary,
         name='Get_Clustering_Vocabulary'),

    path(
        'Get_ClusteringEvaluation_Silhouette_ChartData/<int:country_id>/<str:algorithm_name>/<str:vector_type>/<str:ngram_type>/',
        views.Get_ClusteringEvaluation_Silhouette_ChartData, name='Get_ClusteringEvaluation_Silhouette_ChartData'),
    path('save_topic_label/<str:topic_id>/<str:username>/<str:label>/', views.save_topic_label,
         name='save_topic_label'),
    path(
        'Get_Topic_Paragraphs_ES/<int:country_id>/<str:topic_id>/<int:result_size>/<int:curr_page>/<int:get_paragraphs>/<int:get_aggregations>/',
        views.Get_Topic_Paragraphs_ES, name='Get_Topic_Paragraphs_ES'),
    path(
        'Get_Topic_Paragraphs_Column_ES/<int:country_id>/<str:topic_id>/<str:field_name>/<str:field_value>/<int:curr_page>/<int:result_size>/',
        views.Get_Topic_Paragraphs_Column_ES, name='Get_Topic_Paragraphs_Column_ES'),
    path(
        'Get_ANOVA_Word_Paragraphs_Column_ES/<int:country_id>/<str:topic_id>/<str:word>/<int:curr_page>/<int:result_size>/',
        views.Get_ANOVA_Word_Paragraphs_Column_ES, name='Get_ANOVA_Word_Paragraphs_Column_ES'),
    path(
        'Export_ANOVA_Word_Paragraphs_Column_ES/<int:country_id>/<str:topic_id>/<str:word>/<str:username>/<int:curr_page>/<int:result_size>/',
        views.Export_ANOVA_Word_Paragraphs_Column_ES, name='Export_ANOVA_Word_Paragraphs_Column_ES'),

    path('Excel_Topic_Paragraphs_ES/<int:country_id>/<str:topic_id>/<int:result_size>/<int:curr_page>/<str:username>/',
         views.Excel_Topic_Paragraphs_ES, name='Excel_Topic_Paragraphs_ES'),

    path('Get_Topic_Anova_ChartData/<int:country_id>/<str:topic_id>/', views.Get_Topic_Anova_ChartData,
         name='Get_Topic_Anova_ChartData'),
    path('Get_Topic_TagCloud_ChartData/<int:country_id>/<str:topic_id>/', views.Get_Topic_TagCloud_ChartData,
         name='Get_Topic_TagCloud_ChartData'),
    path(
        'GetClusteringGraphData/<int:country_id>/<str:algorithm_name>/<str:algorithm_vector_type>/<int:cluster_size>/<str:ngram_type>/',
        views.GetClusteringGraphData,
        name='GetClusteringGraphData'),
    path(
        'GetClusterKeywordGraphData/<int:country_id>/<str:algorithm_name>/<str:algorithm_vector_type>/<int:cluster_size>/<str:ngram_type>/',
        views.GetClusterKeywordGraphData,
        name='GetClusterKeywordGraphData'),
    path(
        'GetKeywordClustersData/<int:country_id>/<str:algorithm_name>/<str:algorithm_vector_type>/<int:cluster_size>/<str:keyword>/',
        views.GetKeywordClustersData,
        name='GetKeywordClustersData'),
    path('GetKeywordLDAData/<int:country_id>/<int:cluster_size>/<str:username>/<str:keyword>/', views.GetKeywordLDAData,
         name='GetKeywordLDAData'),
    path('insert_subject_keyword_list/<int:id>/', views.insert_subject_keyword_list,
         name='insert_subject_keyword_list'),
    path('knowledgeGraph/', views.knowledgeGraph, name='knowledgeGraph'),
    path('SaveKnowledgeGraph/<str:graph_name>/<str:username>/<int:graph_id>/', views.SaveKnowledgeGraph,
         name='SaveKnowledgeGraph'),
    path('DeleteKnowledgeGraph/<int:graph_id>/', views.DeleteKnowledgeGraph, name='DeleteKnowledgeGraph'),
    path('sentiment_analysis/', views.sentiment_analysis_panel, name='sentimentAnalysis'),
    path('tagAnalyser/<str:text>/', views.tagging_analyser, name='tag_analysis'),
    path('sentimentAnalyser/<str:text>/', views.sentiment_analyser, name='sentiment_analysis'),
    path('classificationAnalyser/<str:text>/', views.classification_analyser,
         name='classification_analysis'),
    path('auto_translator/<str:text>/', views.auto_translator,
         name='auto_translator'),
    path('GetParagraphBy_ID/<int:paragraph_id>/', views.GetParagraphBy_ID,
         name='GetParagraphBy_ID'),
    path('GetAllKnowledgeGraphList/<str:username>/', views.GetAllKnowledgeGraphList,
         name='GetAllKnowledgeGraphList'),
    path('GetKnowledgeGraphData/<int:version_id>/', views.GetKnowledgeGraphData,
         name='GetKnowledgeGraphData'),
    path('GetTextSummary/', views.GetTextSummary,
         name='GetTextSummary'),
    # /****** Rahbari Labels ******/
    path('GetLabelTimeSeries_ChartData/<str:label_name>/', views.GetLabelTimeSeries_ChartData,
         name='GetLabelTimeSeries_ChartData'),
    path('GetAffinityLabels_ByLabelName/<str:label_name>/', views.GetAffinityLabels_ByLabelName,
         name='GetAffinityLabels_ByLabelName'),
    path('GetCorrelatedLabels_ByLabelName/<str:label_name>/', views.GetCorrelatedLabels_ByLabelName,
         name='GetCorrelatedLabels_ByLabelName'),
    path('GetCorrelatedLabels_TimeSeries_ChartData/<str:source_label_name>/<str:dest_label_name>/',
         views.GetCorrelatedLabels_TimeSeries_ChartData, name='GetCorrelatedLabels_TimeSeries_ChartData'),
    # /****** Advanced ARIMA ******/
    path('ARIMA_Prediction_TO_DB_2/<int:id>/', views.ARIMA_Prediction_TO_DB_2, name='ARIMA_Prediction_TO_DB_2'),

    path('RahabriCoLabelsGraph/<int:id>/', views.RahabriCoLabelsGraph, name='RahabriCoLabelsGraph'),
    path('RahbariGraphUpload/<int:id>/', views.RahbariGraphUpload, name='RahbariGraphUpload'),
    path('RahbariTypeExtractor/<int:id>/', views.RahbariTypeExtractor, name='RahbariTypeExtractor'),
    path('rahbari_correlated_labels_extractor/<int:id>/', views.rahbari_correlated_labels_extractor,
         name='rahbari_correlated_labels_extractor'),
    path('insert_docs_to_rahbari_table/<int:id>/', views.insert_docs_to_rahbari_table,
         name='insert_docs_to_rahbari_table'),
    path("rahbari_graph/", views.rahbari_graph, name='rahbari_graph'),
    path('getRahbariCoLabelsGraphMinMaxWeight/', views.getRahbariCoLabelsGraphMinMaxWeight,
         name='getRahbariCoLabelsGraphMinMaxWeight'),
    path('getRahbariGraphData/<int:type_id>/<int:limit_neighbour_count>/<str:label_id>/<str:document_id>/<int:level>/',
         views.getRahbariGraphData, name='getRahbariGraphData'),
    path("getRahbariGraphType/", views.getRahbariGraphType, name='getRahbariGraphType'),
    path("GetRahbariTypes/", views.GetRahbariTypes, name='GetRahbariTypes'),
    path("GetRahbariLabels/", views.GetRahbariLabels, name='GetRahbariLabels'),
    path('GetRahbariTypeDetail/<int:document_id>/', views.GetRahbariTypeDetail, name='getRahbariGraphData'),
    path("getRahbariLabelsList/", views.getRahbariLabelsList, name='getRahbariLabelsList'),
    path("getRahbariDocumentsList/", views.getRahbariDocumentsList, name='getRahbariDocumentsList'),
]
